import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from '../models/tag';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Tag.name, schema: TagSchema}
    ])
  ],
  controllers: [TagController]
})
export class TagModule {}
