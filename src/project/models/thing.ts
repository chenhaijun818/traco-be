import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ThingDocument = Thing & Document;

@Schema()
export class Thing extends Document {
    @Prop()
    id: string;
    @Prop()
    pid: string;
    @Prop()
    name: string;
    @Prop()
    creator: string;
    @Prop()
    owner: string;
    @Prop()
    avatar: string;
    @Prop()
    desc: string;
}

export const ThingSchema = SchemaFactory.createForClass(Thing);
