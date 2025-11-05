import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagDocument } from '../models/tag';

@Controller('project/tag')
export class TagController {

  constructor(@InjectModel("Tag") private tag: Model<TagDocument>) {
  }

  @Post('add')
  async add(@Body() body) {
    const { name, pid } = body;
    const res = await this.tag.create({
      name, pid
    });
    return {code: 200, data: res, message: 'success'}
  }

  @Post('delete')
  async delete(@Body() body) {
    const res = await this.tag.findById(body.id).exec();
    if (res) {
      res.delete();
    }
    return {code: 200, data: res, message: 'success'}
  }

  @Get('tags')
  async getRoles(@Query() query) {
    const res = await this.tag.find({pid: query.pid}).exec();
    return {code: 200, data: res, message: 'success'}
  }
}
