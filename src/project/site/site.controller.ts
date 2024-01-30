import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {SiteDocument} from "../models/site";
import {Model} from "mongoose";

@Controller('project/site')
export class SiteController {
    constructor(@InjectModel('Site') private site: Model<SiteDocument>) {
    }
    @Post('add')
    async add(@Body() body) {
        const {name, pid, address, desc} = body;
        const res = await this.site.create({name, pid, address, desc});
        return {code: 200, data: res, message: 'success'}
    }
    @Post('delete')
    async delete(@Body() body){
        const res = await this.site.findById(body.id).exec();
        if (res) {
            res.delete();
        }
        return {code: 200, data: res, message: 'success'}
    }
    @Post('update')
    async update(@Body() body){
        const { id, ...update } = body;
        const res = await this.site.findByIdAndUpdate(id, update).exec();
        return {code: 200, data: res, message: 'success'}
    }
    @Get('sites')
    async getSites(@Query() query){
        const res = await this.site.find({pid: query.pid}).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
