import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {TrackDocument} from "../models/track";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {ProjectDocument} from "../models/project";

@Controller('project/track')
export class TrackController {
    constructor(@InjectModel("Track") private track: Model<TrackDocument>,
                @InjectModel("Project") private project: Model<ProjectDocument>
                ) {
    }

    @Post('add')
    async add(@Body() body) {
        const project = await this.project.findById(body.pid);
        const res = await this.track.create({
            name: body.name,
            pid: body.pid,
            order: project.trackCount + 1,
            affairCount: 1
        });
        project.update({trackCount: project.trackCount + 1})
        return {code: 200, data: res, message: 'success'}
    }

    @Post('delete')
    async delete(@Body() body) {
        console.log(body)
        const t = await this.track.findById(body.id).exec();
        if (t) {
            t.delete();
        }
        return {code: 200, data: t, message: 'success'}
    }

    @Get('tracks')
    async getTracks(@Query() query){
        console.log(query)
        const res = await this.track.find({pid: query.pid}).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
