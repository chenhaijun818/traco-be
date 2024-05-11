import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {VolumeDocument} from "../models/volume";
import {Model} from "mongoose";

@Controller('volume')
export class VolumeController {
    constructor(@InjectModel('Volume') private volume: Model<VolumeDocument>) {
    }

    @Post('add')
    async add(@Body() body) {
        const {name, pid} = body;
        const res = await this.volume.create({name, pid});
        return {code: 200, data: res, message: 'success'}
    }

    @Post('delete')
    async delete(@Body() body) {
        const res = await this.volume.findById(body.id).exec();
        if (res) {
            res.delete();
        }
        return {code: 200, data: res, message: 'success'}
    }

    @Post('update')
    async update(@Body() body) {
        const {id, ...update} = body;
        const res = await this.volume.findByIdAndUpdate(id, update).exec();
        return {code: 200, data: res, message: 'success'}
    }

    @Get('getVolumes')
    async getVolumes(@Query() query) {
        const res = await this.volume.find({pid: query.pid}).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
