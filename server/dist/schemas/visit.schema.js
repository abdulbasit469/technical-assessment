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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitSchema = exports.Visit = exports.VISIT_VIA = void 0;
const mongoose_1 = require("@nestjs/mongoose");
exports.VISIT_VIA = [
    'typed',
    'link',
    'back',
    'forward',
    'history',
    'search',
    'publish',
];
let Visit = class Visit {
    person;
    address;
    title;
    status;
    via;
    at;
    seed;
};
exports.Visit = Visit;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Visit.prototype, "person", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Visit.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], Visit.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['found', 'nowhere'] }),
    __metadata("design:type", String)
], Visit.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: exports.VISIT_VIA }),
    __metadata("design:type", String)
], Visit.prototype, "via", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Visit.prototype, "at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Visit.prototype, "seed", void 0);
exports.Visit = Visit = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Visit);
exports.VisitSchema = mongoose_1.SchemaFactory.createForClass(Visit);
exports.VisitSchema.index({ person: 1, at: -1 });
//# sourceMappingURL=visit.schema.js.map