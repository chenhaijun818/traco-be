import { Controller, Post, Param, Headers, Req, Get } from "@nestjs/common";
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

  @Get("myProjects")
  async getProjects(@Req() req) {
    const list = await this.project.find({id: req.user.id}).exec();
    return {
      code: 200,
      data: {
        list
      },
      message: 'success'
    }
  }

  @Get(":id")
  async getProject(@Param() param) {
    const res = await this.project.findOne({id: param.id}).exec();
    return {
      code: 200,
      data: res,
      message: 'success'
    }
  }

}
