import { BrowseDto, PublishDto } from './dto';
import { WebService } from './web.services';
export declare class WebController {
    private readonly web;
    constructor(web: WebService);
    people(): Promise<{
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
    history(person?: string): Promise<{
        id: string;
        address: string;
        title: string | null;
        status: "found" | "nowhere";
        via: "search" | "link" | "typed" | "back" | "forward" | "history" | "publish";
        at: Date;
    }[]>;
    search(query?: string): Promise<{
        address: string;
        title: string;
        author: string;
        snippet: string;
    }[]>;
    publish(dto: PublishDto): Promise<{
        address: string;
    }>;
}
