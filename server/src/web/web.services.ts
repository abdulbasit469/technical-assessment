import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADDRESS_PATTERN, normaliseAddress } from '../common/address';
import { extractText, sanitizeSite } from '../common/sanitize';
import { makeSnippet } from '../common/snippet';
import { Person } from '../schemas/person.schema';
import { Site } from '../schemas/site.schema';
import { Visit } from '../schemas/visit.schema';
import { BrowseDto, PublishDto } from './dto';

@Injectable()
export class WebService {
  constructor(
    @InjectModel(Person.name) private readonly people: Model<Person>,
    @InjectModel(Site.name) private readonly sites: Model<Site>,
    @InjectModel(Visit.name) private readonly visits: Model<Visit>,
  ) {}

  async listPeople() {
    const people = await this.people.find().sort({ name: 1 }).lean();
    return people.map(({ _id, name }) => ({ id: _id, name }));
  }

  async browse(dto: BrowseDto) {
    const { address, site } = await this.resolve(dto);
    if (!site) return { status: 'nowhere' as const, address };
    return { status: 'found' as const, address, site: await this.present(site) };
  }

  async visit(dto: BrowseDto) {
    await this.resolve(dto);
  }

  async history(person: string) {
    await this.requirePerson(person);
    const visits = await this.visits.find({ person }).sort({ at: -1 }).limit(500).lean();
    return visits.map(({ _id, address, title, status, via, at }) => ({
      id: String(_id),
      address,
      title,
      status,
      via,
      at,
    }));
  }

  async search(query: string) {
    const q = query.trim();
    if (!q) return [];

    const found = await this.sites
      .find({ $text: { $search: q } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .lean();

    const names = await this.authorNames(found.map((site) => site.author));

    return found.map((site) => ({
      address: site.address,
      title: site.title,
      author: names.get(site.author) ?? site.author,
      snippet: makeSnippet(site.text, q),
    }));
  }

  async publish(dto: PublishDto) {
    await this.requirePerson(dto.author);

    const address = normaliseAddress(dto.address);
    if (!ADDRESS_PATTERN.test(address)) {
      throw new BadRequestException(
        'Addresses look like name.zz: lowercase letters, digits and hyphens',
      );
    }

    const html = sanitizeSite(dto.html);
    const text = extractText(html);
    if (!text) throw new BadRequestException('The page has no readable text');

    try {
      await this.sites.create({
        address,
        title: dto.title.trim(),
        html,
        text,
        author: dto.author,
        createdAt: new Date(),
      });
    } catch (error) {
      if ((error as { code?: number }).code === 11000) {
        throw new ConflictException('That address is already taken');
      }
      throw error;
    }

    return { address };
  }

  private async resolve(dto: BrowseDto) {
    await this.requirePerson(dto.person);

    const address = normaliseAddress(dto.address);
    if (!address) throw new BadRequestException('Address is empty');

    const site = await this.sites.findOne({ address }).lean();

    await this.visits.create({
      person: dto.person,
      address,
      title: site?.title ?? null,
      status: site ? 'found' : 'nowhere',
      via: dto.via,
      at: new Date(),
    });

    return { address, site };
  }

  private async requirePerson(id: string) {
    if (!(await this.people.exists({ _id: id }))) {
      throw new NotFoundException('Unknown person');
    }
  }

  private async authorNames(ids: string[]) {
    const authors = await this.people.find({ _id: { $in: ids } }).lean();
    return new Map(authors.map((author) => [author._id, author.name]));
  }

  private async present(site: Site) {
    const names = await this.authorNames([site.author]);
    return {
      address: site.address,
      title: site.title,
      html: site.html,
      author: { id: site.author, name: names.get(site.author) ?? site.author },
    };
  }
}