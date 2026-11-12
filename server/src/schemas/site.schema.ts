import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Site {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  html: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, index: true })
  author: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const SiteSchema = SchemaFactory.createForClass(Site);

SiteSchema.index(
  { title: 'text', text: 'text' },
  { weights: { title: 5, text: 1 }, name: 'site_text' },
);