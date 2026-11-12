"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const address_1 = require("../common/address");
const sanitize_1 = require("../common/sanitize");
const snippet_1 = require("../common/snippet");
const person_schema_1 = require("../schemas/person.schema");
const site_schema_1 = require("../schemas/site.schema");
const visit_schema_1 = require("../schemas/visit.schema");
let WebService = class WebService {
    people;
    sites;
    visits;
    constructor(people, sites, visits) {
        this.people = people;
        this.sites = sites;
        this.visits = visits;
    }
    async listPeople() {
        const people = await this.people.find().sort({ name: 1 }).lean();
        return people.map(({ _id, name }) => ({ id: _id, name }));
    }
    async browse(dto) {
        const { address, site } = await this.resolve(dto);
        if (!site)
            return { status: 'nowhere', address };
        return { status: 'found', address, site: await this.present(site) };
    }
    async visit(dto) {
        await this.resolve(dto);
    }
    async history(person) {
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
    async search(query) {
        const q = query.trim();
        if (!q)
            return [];
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
            snippet: (0, snippet_1.makeSnippet)(site.text, q),
        }));
    }
    async publish(dto) {
        await this.requirePerson(dto.author);
        const address = (0, address_1.normaliseAddress)(dto.address);
        if (!address_1.ADDRESS_PATTERN.test(address)) {
            throw new common_1.BadRequestException('Addresses look like name.zz: lowercase letters, digits and hyphens');
        }
        const html = (0, sanitize_1.sanitizeSite)(dto.html);
        const text = (0, sanitize_1.extractText)(html);
        if (!text)
            throw new common_1.BadRequestException('The page has no readable text');
        try {
            await this.sites.create({
                address,
                title: dto.title.trim(),
                html,
                text,
                author: dto.author,
                createdAt: new Date(),
            });
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('That address is already taken');
            }
            throw error;
        }
        return { address };
    }
    async resolve(dto) {
        await this.requirePerson(dto.person);
        const address = (0, address_1.normaliseAddress)(dto.address);
        if (!address)
            throw new common_1.BadRequestException('Address is empty');
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
    async requirePerson(id) {
        if (!(await this.people.exists({ _id: id }))) {
            throw new common_1.NotFoundException('Unknown person');
        }
    }
    async authorNames(ids) {
        const authors = await this.people.find({ _id: { $in: ids } }).lean();
        return new Map(authors.map((author) => [author._id, author.name]));
    }
    async present(site) {
        const names = await this.authorNames([site.author]);
        return {
            address: site.address,
            title: site.title,
            html: site.html,
            author: { id: site.author, name: names.get(site.author) ?? site.author },
        };
    }
};
exports.WebService = WebService;
exports.WebService = WebService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(person_schema_1.Person.name)),
    __param(1, (0, mongoose_1.InjectModel)(site_schema_1.Site.name)),
    __param(2, (0, mongoose_1.InjectModel)(visit_schema_1.Visit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], WebService);
//# sourceMappingURL=web.services.js.map