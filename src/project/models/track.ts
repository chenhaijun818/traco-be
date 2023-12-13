import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TrackDocument = Track & Document;

@Schema()
export class Track extends Document {
    @Prop()
    id: string;
    @Prop()
    name: string;

    // 绑定的角色id
    @Prop()
    rid: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
