
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type SiteDocument = Site & Document;
@Schema()
export class Site extends Document {
    @Prop()
    id: string;
    @Prop()
    pid: string;
    @Prop()
    name: string;
    @Prop()
    address: string;
    @Prop()
    desc: string;
}
export const SiteSchema = SchemaFactory.createForClass(Site);
