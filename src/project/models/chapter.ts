import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Chapter extends Document {
    @Prop()
    id: string;
    @Prop()
    pid: string;
    @Prop()
    vid: string;
    @Prop()
    name: string;
    @Prop()
    content: string;
}

export type ChapterDocument = Chapter & Document;

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
