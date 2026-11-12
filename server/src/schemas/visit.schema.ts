import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const VISIT_VIA = [
  'typed',
  'link',
  'back',
  'forward',
  'history',
  'search',
  'publish',
] as const;

export type VisitVia = (typeof VISIT_VIA)[number];

@Schema({ versionKey: false })
export class Visit {
  @Prop({ required: true })
  person: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: String, default: null })
  title: string | null;

  @Prop({ required: true, enum: ['found', 'nowhere'] })
  status: 'found' | 'nowhere';

  @Prop({ required: true, enum: VISIT_VIA })
  via: VisitVia;

  @Prop({ required: true })
  at: Date;

  @Prop({ default: false })
  seed: boolean;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
VisitSchema.index({ person: 1, at: -1 });