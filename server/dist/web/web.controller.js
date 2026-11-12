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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const web_services_1 = require("./web.services");
let WebController = class WebController {
    web;
    constructor(web) {
        this.web = web;
    }
    people() {
        return this.web.listPeople();
    }
    browse(dto) {
        return this.web.browse(dto);
    }
    visit(dto) {
        return this.web.visit(dto);
    }
    history(person = '') {
        return this.web.history(person);
    }
    search(query = '') {
        return this.web.search(query);
    }
    publish(dto) {
        return this.web.publish(dto);
    }
};
exports.WebController = WebController;
__decorate([
    (0, common_1.Get)('people'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebController.prototype, "people", null);
__decorate([
    (0, common_1.Post)('browse'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BrowseDto]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "browse", null);
__decorate([
    (0, common_1.Post)('visits'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BrowseDto]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "visit", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('person')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "history", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('sites'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PublishDto]),
    __metadata("design:returntype", void 0)
], WebController.prototype, "publish", null);
exports.WebController = WebController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [web_services_1.WebService])
], WebController);
//# sourceMappingURL=web.controller.js.map