import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "../models/project";

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [ProjectController]
})
export class ProjectModule {}
