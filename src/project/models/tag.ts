import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Tag extends Document {
  @Prop()
  id: string;

  @Prop()
  pid: string;

  @Prop()
  name: string;

}
export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
