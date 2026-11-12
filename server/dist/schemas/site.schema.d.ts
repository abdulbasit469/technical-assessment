export declare class Site {
    address: string;
    title: string;
    html: string;
    text: string;
    author: string;
    createdAt: Date;
}
export declare const SiteSchema: import("mongoose").Schema<Site, import("mongoose").Model<Site, any, any, any, any, any, Site & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Site, import("mongoose").Document<unknown, {}, Site, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Site & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    address?: import("mongoose").SchemaDefinitionProperty<string, Site, import("mongoose").Document<unknown, {}, Site, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Site & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Site, import("mongoose").Document<unknown, {}, Site, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Site & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    html?: import("mongoose").SchemaDefinitionProperty<string, Site, import("mongoose").Document<unknown, {}, Site, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Site & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    text?: import("mongoose").SchemaDefinitionProperty<string, Site, import("mongoose").Document<unknown, {}, Site, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Site & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    author?: import("mongoose").SchemaDefinitionProperty<string, Site, import("mongoose").Document<unknown, {}, Site, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Site & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Site, import("mongoose").Document<unknown, {}, Site, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Site & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Site>;
