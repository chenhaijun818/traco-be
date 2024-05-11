import {Module} from '@nestjs/common';
import {ChapterController} from './chapter.controller';
import {VolumeController} from "./volume.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Volume, VolumeSchema} from "../models/volume";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Volume.name, schema: VolumeSchema}
        ])
    ],
    controllers: [ChapterController, VolumeController]
})
export class ChapterModule {
}
