import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "./models/project";
import { Affair, AffairSchema } from "./models/affair";
import { AffairModule } from './affair/affair.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Affair.name, schema: AffairSchema }
    ]),
    AffairModule,
    TrackModule
  ],
  controllers: [ProjectController]
})
export class ProjectModule {
}
