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
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sanitize_1 = require("../common/sanitize");
const person_schema_1 = require("../schemas/person.schema");
const site_schema_1 = require("../schemas/site.schema");
const visit_schema_1 = require("../schemas/visit.schema");
const seed_data_1 = require("./seed-data");
const BASE_TIME = Date.parse('2026-11-09T09:00:00.000Z');
const HOUR_WINDOW = 3_300_000;
let SeedService = SeedService_1 = class SeedService {
    people;
    sites;
    visits;
    logger = new common_1.Logger(SeedService_1.name);
    constructor(people, sites, visits) {
        this.people = people;
        this.sites = sites;
        this.visits = visits;
    }
    async run() {
        await this.seedPeople();
        await this.seedSites();
        await this.seedVisits();
        this.logger.log(`Seeded ${seed_data_1.PEOPLE.length} people, ${seed_data_1.SITES.length} sites and ${await this.visits.countDocuments({ seed: true })} visits`);
    }
    async seedPeople() {
        await this.people.bulkWrite(seed_data_1.PEOPLE.map((person) => ({
            updateOne: {
                filter: { _id: person.id },
                update: { $set: { name: person.name } },
                upsert: true,
            },
        })));
    }
    async seedSites() {
        await this.sites.bulkWrite(seed_data_1.SITES.map((site) => {
            const html = (0, sanitize_1.sanitizeSite)(site.html);
            return {
                updateOne: {
                    filter: { address: site.address },
                    update: {
                        $set: {
                            title: site.title,
                            html,
                            text: (0, sanitize_1.extractText)(html),
                            author: site.author,
                            createdAt: new Date(BASE_TIME - 86_400_000),
                        },
                    },
                    upsert: true,
                },
            };
        }));
    }
    async seedVisits() {
        const stored = await this.sites.find().lean();
        const titles = new Map(stored.map((site) => [site.address, site.title]));
        const rows = Object.entries(seed_data_1.TRAILS).flatMap(([person, trail], index) => {
            const step = Math.floor(HOUR_WINDOW / trail.length);
            return trail.map((address, position) => ({
                person,
                address,
                title: titles.get(address) ?? null,
                status: titles.has(address) ? 'found' : 'nowhere',
                via: position === 0 ? 'typed' : 'link',
                at: new Date(BASE_TIME + index * 60_000 + position * step),
                seed: true,
            }));
        });
        await this.visits.deleteMany({ seed: true });
        await this.visits.insertMany(rows);
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(person_schema_1.Person.name)),
    __param(1, (0, mongoose_1.InjectModel)(site_schema_1.Site.name)),
    __param(2, (0, mongoose_1.InjectModel)(visit_schema_1.Visit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SeedService);
//# sourceMappingURL=seed.service.js.map