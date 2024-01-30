import {Module} from '@nestjs/common';
import {ThingController} from './thing.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Thing, ThingSchema} from "../models/thing";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Thing.name, schema: ThingSchema}
        ])
    ],
    controllers: [ThingController]
})
export class ThingModule {
}
