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

  // 基准时间，在子模块用做时间基准
  @Prop()
  baseTime: number;

  // 该作品下的支线计数，累加不减
  @Prop()
  trackCount: number;

  // 该作品是否可见
  @Prop()
  visible: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
