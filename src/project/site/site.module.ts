import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Site, SiteSchema} from "../models/site";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Site.name, schema: SiteSchema}
    ])
  ],
  controllers: [SiteController]
})
export class SiteModule {}
