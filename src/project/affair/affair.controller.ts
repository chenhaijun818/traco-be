import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AffairDocument } from "../models/affair";

@Controller("project/affair")
export class AffairController {
  constructor(@InjectModel("Affair") private affair: Model<AffairDocument>) {
  }

  // 新增一个事件
  @Post("add")
  async add(@Body() body) {
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

  @Post('delete')
  async delete(@Body() body) {
    const a = await this.affair.findById(body.id).exec();
    if (a) {
      a.delete();
    }
    return {
      code: 200,
      data: a,
      message: "success"
    };
  }

  @Post('update')
  async update(@Body() body) {
    const { id, ...update } = body;
    const res = await this.affair.findByIdAndUpdate(id, update).exec();
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }

  // 获取作品的所有事件
  @Get("list")
  async getAffairs(@Query() query) {
    const list = await this.affair.find({ pid: query.pid }).exec();
    return {
      code: 200,
      data: { list },
      message: "success"
    };
  }
}