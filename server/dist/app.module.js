"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const person_schema_1 = require("./schemas/person.schema");
const site_schema_1 = require("./schemas/site.schema");
const visit_schema_1 = require("./schemas/visit.schema");
const seed_service_1 = require("./seed/seed.service");
const web_controller_1 = require("./web/web.controller");
const web_services_1 = require("./web/web.services");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/small-web'),
            mongoose_1.MongooseModule.forFeature([
                { name: person_schema_1.Person.name, schema: person_schema_1.PersonSchema },
                { name: site_schema_1.Site.name, schema: site_schema_1.SiteSchema },
                { name: visit_schema_1.Visit.name, schema: visit_schema_1.VisitSchema },
            ]),
        ],
        controllers: [web_controller_1.WebController],
        providers: [web_services_1.WebService, seed_service_1.SeedService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map