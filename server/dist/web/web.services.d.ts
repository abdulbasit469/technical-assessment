import { Model } from 'mongoose';
import { Person } from '../schemas/person.schema';
import { Site } from '../schemas/site.schema';
import { Visit } from '../schemas/visit.schema';
import { BrowseDto, PublishDto } from './dto';
export declare class WebService {
    private readonly people;
    private readonly sites;
    private readonly visits;
    constructor(people: Model<Person>, sites: Model<Site>, visits: Model<Visit>);
    listPeople(): Promise<{
        id: string;
        name: string;
    }[]>;
    browse(dto: BrowseDto): Promise<{
        status: "nowhere";
        address: string;
        site?: undefined;
    } | {
        status: "found";
        address: string;
        site: {
            address: string;
            title: string;
            html: string;
            author: {
                id: string;
                name: string;
            };
        };
    }>;
    visit(dto: BrowseDto): Promise<void>;
    history(person: string): Promise<{
        id: string;
        address: string;
        title: string | null;
        status: "found" | "nowhere";
        via: "search" | "link" | "typed" | "back" | "forward" | "history" | "publish";
        at: Date;
    }[]>;
    search(query: string): Promise<{
        address: string;
        title: string;
        author: string;
        snippet: string;
    }[]>;
    publish(dto: PublishDto): Promise<{
        address: string;
    }>;
    private resolve;
    private requirePerson;
    private authorNames;
    private present;
}
