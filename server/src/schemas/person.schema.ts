import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Person {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);