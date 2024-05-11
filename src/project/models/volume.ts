import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Volume extends Document {
    @Prop()
    id: string;
    @Prop()
    pid: string;
    @Prop()
    name: string;
}

export type VolumeDocument = Volume & Document;

export const VolumeSchema = SchemaFactory.createForClass(Volume)
