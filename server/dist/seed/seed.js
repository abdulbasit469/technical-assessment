"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const seed_service_1 = require("./seed.service");
async function run() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, {
        logger: ['log', 'error', 'warn'],
    });
    await app.get(seed_service_1.SeedService).run();
    await app.close();
}
run();
//# sourceMappingURL=seed.js.map