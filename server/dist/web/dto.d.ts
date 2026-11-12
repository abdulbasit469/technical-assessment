import { VisitVia } from '../schemas/visit.schema';
export declare class BrowseDto {
    person: string;
    address: string;
    via: VisitVia;
}
export declare class PublishDto {
    author: string;
    address: string;
    title: string;
    html: string;
}
