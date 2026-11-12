export declare class Person {
    _id: string;
    name: string;
}
export declare const PersonSchema: import("mongoose").Schema<Person, import("mongoose").Model<Person, any, any, any, any, any, Person & Required<{
    _id: string;
}> & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Person, import("mongoose").Document<unknown, {}, Person, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Person & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<string, Person, import("mongoose").Document<unknown, {}, Person, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Person & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Person, import("mongoose").Document<unknown, {}, Person, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Person & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Person>;
