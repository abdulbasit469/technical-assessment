import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { extractText, sanitizeSite } from '../common/sanitize';
import { Person } from '../schemas/person.schema';
import { Site } from '../schemas/site.schema';
import { Visit } from '../schemas/visit.schema';
import { PEOPLE, SITES, TRAILS } from './seed-data';

const BASE_TIME = Date.parse('2026-11-09T09:00:00.000Z');
const HOUR_WINDOW = 3_300_000;

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Person.name) private readonly people: Model<Person>,
    @InjectModel(Site.name) private readonly sites: Model<Site>,
    @InjectModel(Visit.name) private readonly visits: Model<Visit>,
  ) {}

  async run() {
    await this.seedPeople();
    await this.seedSites();
    await this.seedVisits();
    this.logger.log(
      `Seeded ${PEOPLE.length} people, ${SITES.length} sites and ${await this.visits.countDocuments({ seed: true })} visits`,
    );
  }

  private async seedPeople() {
    await this.people.bulkWrite(
      PEOPLE.map((person) => ({
        updateOne: {
          filter: { _id: person.id },
          update: { $set: { name: person.name } },
          upsert: true,
        },
      })),
    );
  }

  private async seedSites() {
    await this.sites.bulkWrite(
      SITES.map((site) => {
        const html = sanitizeSite(site.html);
        return {
          updateOne: {
            filter: { address: site.address },
            update: {
              $set: {
                title: site.title,
                html,
                text: extractText(html),
                author: site.author,
                createdAt: new Date(BASE_TIME - 86_400_000),
              },
            },
            upsert: true,
          },
        };
      }),
    );
  }

  private async seedVisits() {
    const stored = await this.sites.find().lean();
    const titles = new Map(stored.map((site) => [site.address, site.title]));

    const rows = Object.entries(TRAILS).flatMap(([person, trail], index) => {
      const step = Math.floor(HOUR_WINDOW / trail.length);
      return trail.map((address, position) => ({
        person,
        address,
        title: titles.get(address) ?? null,
        status: titles.has(address) ? ('found' as const) : ('nowhere' as const),
        via: position === 0 ? ('typed' as const) : ('link' as const),
        at: new Date(BASE_TIME + index * 60_000 + position * step),
        seed: true,
      }));
    });

    await this.visits.deleteMany({ seed: true });
    await this.visits.insertMany(rows);
  }
}