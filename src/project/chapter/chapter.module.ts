import {Module} from '@nestjs/common';
import {ChapterController} from './chapter.controller';
import {VolumeController} from "./volume.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Volume, VolumeSchema} from "../models/volume";
import {Chapter, ChapterSchema} from "../models/chapter";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Volume.name, schema: VolumeSchema},
            {name: Chapter.name, schema: ChapterSchema}
        ])
    ],
    controllers: [ChapterController, VolumeController]
})
export class ChapterModule {
}
