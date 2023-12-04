import { Controller, Post, Param, Req, Get, Body, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectDocument } from "./models/project";
import { AffairDocument } from "./models/affair";

@Controller("project")
export class ProjectController {
  constructor(@InjectModel("Project") private project: Model<ProjectDocument>,
              @InjectModel("Affair") private affair: Model<AffairDocument>) {
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
      data: { list },
      message: "success"
    };
  }


  @Get("tracks")
  async getTracks(@Query() query) {
    console.log(query);
    return {
      code: 200,
      data: {
        list: [
          { id: "1", name: "主线" },
          { id: "2", name: "诸葛狗蛋" },
          { id: "3", name: "西门翠花" },
          { id: "4", name: "欧阳富贵" }
        ]
      },
      message: "success"
    };
  }

  // 获取作品的所有事件
  @Get("affairs")
  async getAffairs(@Query() query) {
    const list = await this.affair.find({ pid: query.pid }).exec();
    return {
      code: 200,
      data: { list },
      message: "success"
    };
  }

  // 新增一个事件
  @Post("affair/add")
  async addAffair(@Body() body) {
    const res = await this.affair.create({
      name: body.name,
      content: body.content,
      pid: body.pid,
      tid: body.tid
    });
    return {
      code: 200,
      data: res,
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
