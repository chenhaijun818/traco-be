import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "./models/project";
import { Affair, AffairSchema } from "./models/affair";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Affair.name, schema: AffairSchema }
    ])
  ],
  controllers: [ProjectController]
})
export class ProjectModule {
}
