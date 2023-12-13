import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "../models/track";

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: Track.name, schema: TrackSchema}
      ])
  ],
  controllers: [TrackController]
})
export class TrackModule {}
