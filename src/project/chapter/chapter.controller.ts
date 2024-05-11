import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ChapterDocument} from "../models/chapter";

@Controller('chapter')
export class ChapterController {
    constructor(@InjectModel('Chapter') private chapter: Model<ChapterDocument>) {
    }

    @Post('add')
    async add(@Body() body) {
        const {name, pid, vid} = body;
        const res = await this.chapter.create({name, pid, vid});
        return {code: 200, data: res, message: 'success'}
    }

    @Post('delete')
    async delete(@Body() body) {
        const res = await this.chapter.findById(body.id).exec();
        if (res) {
            res.delete();
        }
        return {code: 200, data: res, message: 'success'}
    }

    @Post('update')
    async update(@Body() body) {
        const {id, ...update} = body;
        const res = await this.chapter.findByIdAndUpdate(id, update).exec();
        return {code: 200, data: res, message: 'success'}
    }

    @Get('getChapters')
    async getChapters(@Query() query) {
        const res = await this.chapter.find({pid: query.pid}).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
