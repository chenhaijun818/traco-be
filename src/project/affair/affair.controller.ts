import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AffairDocument} from "../models/affair";

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
            tid: body.tid,
            sort: body.sort,
            roles: body.roles,
            startTime: body.startTime
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
        const {id, ...update} = body;
        const res = await this.affair.findByIdAndUpdate(id, update).exec();
        return {
            code: 200,
            data: res,
            message: "success"
        };
    }

    // 获取作品的所有事件
    @Get("affairs")
    async getAffairs(@Query() query) {
        const list = await this.affair.find({pid: query.pid}).exec();
        return {
            code: 200,
            data: list,
            message: "success"
        };
    }

    @Get(':id')
    async getAffair(@Param() param) {
        const res = await this.affair.findById(param.id).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
