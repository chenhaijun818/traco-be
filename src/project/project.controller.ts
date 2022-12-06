import { Controller, Post, Headers, Req } from "@nestjs/common";
import { nanoid } from "nanoid";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectDocument } from "../models/project";

@Controller("project")
export class ProjectController {
  constructor(@InjectModel("Project") private project: Model<ProjectDocument>) {
  }

  @Post("create")
  async create(@Headers() headers, @Req() req) {
    const uuid = nanoid(8);
    const res = await this.project.create({ uuid, name: "未命名作品", user: req.user.id });
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }
}
