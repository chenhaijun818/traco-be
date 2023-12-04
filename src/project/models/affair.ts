import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AffairDocument = Affair & Document;

@Schema()
export class Affair extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  pid: string;

  @Prop()
  tid: string;

  @Prop()
  content: string;
}

export const AffairSchema = SchemaFactory.createForClass(Affair);