import {Module} from '@nestjs/common';
import {TrackController} from './track.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "../models/track";
import {Project, ProjectSchema} from "../models/project";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Track.name, schema: TrackSchema},
            {name: Project.name, schema: ProjectSchema}
        ])
    ],
    controllers: [TrackController]
})
export class TrackModule {
}
