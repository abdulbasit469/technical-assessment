import { Model } from 'mongoose';
import { Person } from '../schemas/person.schema';
import { Site } from '../schemas/site.schema';
import { Visit } from '../schemas/visit.schema';
export declare class SeedService {
    private readonly people;
    private readonly sites;
    private readonly visits;
    private readonly logger;
    constructor(people: Model<Person>, sites: Model<Site>, visits: Model<Visit>);
    run(): Promise<void>;
    private seedPeople;
    private seedSites;
    private seedVisits;
}
