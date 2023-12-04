import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProjectDocument = Project & Document;

@Schema()
export class Project extends Document {
  @Prop()
  uuid: string;
  @Prop()
  name: string;

  @Prop()
  user: string;

  @Prop()
  desc: string;

  @Prop()
  tags: string[];

  @Prop()
  cover: string;

  @Prop()
  createdTime: Date;

  @Prop()
  updateTime: Date;

  @Prop()
  status: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);