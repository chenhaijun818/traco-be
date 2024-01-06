import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type AffairDocument = Affair & Document;

@Schema()
export class Affair extends Document {
  @Prop()
  id: string;

  // 事件名
  @Prop()
  name: string;

  // 事件所作品
  @Prop()
  pid: string;

  // 事件所属时间轴
  @Prop()
  tid: string;

  // 开始时间
  @Prop()
  startTime: number;

  // 结束时间
  @Prop()
  endTime: number;

  // 事件过程
  @Prop()
  content: string;

  // 事件发生地点
  @Prop()
  site: string;

  // 主要角色id
  @Prop()
  roles: string[];

  // 参与角色id
  @Prop()
  otherRoles: string[];

  // 序号
  @Prop()
  order: number;
}

export const AffairSchema = SchemaFactory.createForClass(Affair);
