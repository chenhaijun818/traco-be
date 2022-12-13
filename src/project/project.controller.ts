import { Controller, Post, Param, Req, Get, Body } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectDocument } from "../models/project";

@Controller("project")
export class ProjectController {
  constructor(@InjectModel("Project") private project: Model<ProjectDocument>) {
  }

  @Post("create")
  async create(@Req() req) {
    const cover = "https://traco-oss.oss-cn-hangzhou.aliyuncs.com/covers/default-cover.jpg";
    const res = await this.project.create({
      name: "未命名作品",
      user: req.user.id,
      cover,
      desc: "暂无简介"
    });
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }

  @Post("delete")
  async delete(@Req() req, @Body() body) {
    const p = await this.project.findById(body.id).exec();
    if (p.user === req.user.id) {
      p.delete();
      p.save();
    }
    return {
      code: 200,
      data: p,
      message: "success"
    };
  }

  @Post("update")
  async update(@Body() body) {
    const { id, ...update } = body;
    const res = await this.project.findByIdAndUpdate(id, update).exec();
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }

  @Get("myProjects")
  async getProjects(@Req() req) {
    const list = await this.project.find({ id: req.user.id }).exec();
    return {
      code: 200,
      data: {
        list
      },
      message: "success"
    };
  }

  @Get(":id")
  async getProject(@Param() param) {
    const res = await this.project.findById(param.id).exec();
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }

}
