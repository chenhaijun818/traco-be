import { Controller, Get, Post, UploadedFile, UseInterceptors, StreamableFile, Req, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { nanoid } from "nanoid";
import OSS from "ali-oss";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  client = null;
  constructor(private config: ConfigService) {
    this.client = new OSS({
      accessKeyId: config.get('ALC_ACCESS_ID'),
      accessKeySecret: config.get('ALC_ACCESS_SECRET'),
      bucket: "traco-oss",
      endpoint: "oss-cn-hangzhou.aliyuncs.com"
    });
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file, @Body() body) {
    const stream = new StreamableFile(file.buffer);
    const url = `${body.dir}/${nanoid(12)}.jpg`;
    const res = await this.client.putStream(url, stream.getStream());
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }

  @Get("test")
  test(@Req() req) {
    console.log(req.user);
    return {
      code: 200,
      data: {},
      message: "success"
    };
  }
}
