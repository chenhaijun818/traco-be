import {Body, Controller, Get, Post, Query} from '@nestjs/common';
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
        console.log(res);
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
        console.log(body)
        const { id, ...update } = body;
        const res = await this.role.findByIdAndUpdate(id, update).exec();
        return {code: 200, data: res, message: 'success'}
    }

    @Get('roles')
    async getRoles(@Query() query) {
        console.log(query)
        const res = await this.role.find({pid: query.pid}).exec();
        console.log(res);
        return {code: 200, data: res, message: 'success'}
    }
}
