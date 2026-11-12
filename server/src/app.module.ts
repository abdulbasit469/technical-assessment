import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema';
import { Site, SiteSchema } from './schemas/site.schema';
import { Visit, VisitSchema } from './schemas/visit.schema';
import { SeedService } from './seed/seed.service';
import { WebController } from './web/web.controller';
import { WebService } from './web/web.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/small-web'),
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: Site.name, schema: SiteSchema },
      { name: Visit.name, schema: VisitSchema },
    ]),
  ],
  controllers: [WebController],
  providers: [WebService, SeedService],
})
export class AppModule {}