export declare const VISIT_VIA: readonly ["typed", "link", "back", "forward", "history", "search", "publish"];
export type VisitVia = (typeof VISIT_VIA)[number];
export declare class Visit {
    person: string;
    address: string;
    title: string | null;
    status: 'found' | 'nowhere';
    via: VisitVia;
    at: Date;
    seed: boolean;
}
export declare const VisitSchema: import("mongoose").Schema<Visit, import("mongoose").Model<Visit, any, any, any, any, any, Visit & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Visit, import("mongoose").Document<unknown, {}, Visit, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    person?: import("mongoose").SchemaDefinitionProperty<string, Visit, import("mongoose").Document<unknown, {}, Visit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, Visit, import("mongoose").Document<unknown, {}, Visit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string | null, Visit, import("mongoose").Document<unknown, {}, Visit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"found" | "nowhere", Visit, import("mongoose").Document<unknown, {}, Visit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    via?: import("mongoose").SchemaDefinitionProperty<"search" | "link" | "typed" | "back" | "forward" | "history" | "publish", Visit, import("mongoose").Document<unknown, {}, Visit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    at?: import("mongoose").SchemaDefinitionProperty<Date, Visit, import("mongoose").Document<unknown, {}, Visit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    seed?: import("mongoose").SchemaDefinitionProperty<boolean, Visit, import("mongoose").Document<unknown, {}, Visit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Visit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Visit>;
