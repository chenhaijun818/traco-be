import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ThingDocument} from "../models/thing";
import {Model} from "mongoose";

@Controller('project/thing')
export class ThingController {
    constructor(@InjectModel('Thing') private thing: Model<ThingDocument>) {
    }

    @Post('add')
    async add(@Body() body) {
        const {name, pid} = body;
        const avatar = 'https://traco-oss.oss-cn-hangzhou.aliyuncs.com/app/thing.jpg';
        const res = await this.thing.create({name, pid, avatar});
        return {code: 200, data: res, message: 'success'}
    }

    @Post('delete')
    async delete(@Body() body) {
        const res = await this.thing.findById(body.id).exec();
        if (res) {
            res.delete();
        }
        return {code: 200, data: res, message: 'success'}
    }

    @Post('update')
    async update(@Body() body) {
        const {id, ...update} = body;
        const res = await this.thing.findByIdAndUpdate(id, update).exec();
        return {code: 200, data: res, message: 'success'}
    }

    @Get('things')
    async getThings(@Query() query) {
        const res = await this.thing.find({pid: query.pid}).exec();
        return {code: 200, data: res, message: 'success'}
    }

    @Get(':id')
    async getThing(@Param() param) {
        const res = await this.thing.findById(param.id).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
