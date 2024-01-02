import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {RoleDocument} from "../models/role";
import {Model} from "mongoose";

@Controller('project/role')
export class RoleController {
    constructor(@InjectModel("Role") private role: Model<RoleDocument>) {
    }

    @Post('add')
    async add(@Body() body) {
        const { name, pid } = body;
        const avatar = 'https://traco-oss.oss-cn-hangzhou.aliyuncs.com/avatars/role-female.jpg';
        const res = await this.role.create({
            name, pid, avatar
        });
        return {code: 200, data: res, message: 'success'}
    }

    @Post('delete')
    async delete(@Body() body) {
        const res = await this.role.findById(body.id).exec();
        if (res) {
            res.delete();
        }
        return {code: 200, data: res, message: 'success'}
    }

    @Post('update')
    async update(@Body() body) {
        const { id, ...update } = body;
        const res = await this.role.findByIdAndUpdate(id, update).exec();
        return {code: 200, data: res, message: 'success'}
    }

    @Get('roles')
    async getRoles(@Query() query) {
        const res = await this.role.find({pid: query.pid}).exec();
        return {code: 200, data: res, message: 'success'}
    }

    @Get(':id')
    async getAffair(@Param() param) {
        const res = await this.role.findById(param.id).exec();
        return {code: 200, data: res, message: 'success'}
    }
}
