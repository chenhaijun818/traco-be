import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {TrackDocument} from "../models/track";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Controller('project/track')
export class TrackController {
    constructor(@InjectModel("Track") private track: Model<TrackDocument>) {
    }

    @Post('add')
    async add(@Body() body) {
        const res = await this.track.create({
            name: body.name,
            pid: body.pid,
            rid: body.rid,
            visible: true
        });
        return {code: 200, data: res, message: 'success'}
    }

    @Post('delete')
    async delete(@Body() body) {
        const t = await this.track.findById(body.id).exec();
        if (t) {
            t.delete();
        }
        return {code: 200, data: t, message: 'success'}
    }

    @Post('update')
    async update(@Body() body) {
        const {id, ...update} = body;
        const res = await this.track.findByIdAndUpdate(id, update).exec();
        return {code: 200, data: res, message: "success"};
    }

    @Get('tracks')
    async getTracks(@Query() query) {
        const res = await this.track.find({pid: query.pid}).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
