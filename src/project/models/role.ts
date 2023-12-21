import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type RoleDocument = Role & Document;

@Schema()
export class Role extends Document {
    @Prop()
    id: string;

    @Prop()
    pid: string;

    @Prop()
    name: string;

    @Prop()
    gender: number;

    @Prop()
    avatar: string;

    @Prop()
    age: number;

    @Prop()
    desc: string;

    @Prop()
    beauty: number;

    @Prop()
    stature: number;

    @Prop()
    bust: number;

    @Prop()
    waist: number;

    @Prop()
    hip: number;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop()
    marriage: number;

    @Prop()
    virgin: number;

    @Prop()
    fertility: number;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
