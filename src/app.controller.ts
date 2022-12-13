import { Controller, Get, Post, UploadedFile, UseInterceptors, StreamableFile, Req, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { nanoid } from "nanoid";
import { AccessKeyId, AccessKeySecret } from "./core/configs/ali-oss";
import OSS from "ali-oss";

const client = new OSS({
  accessKeyId: AccessKeyId,
  accessKeySecret: AccessKeySecret,
  bucket: "traco-oss",
  endpoint: "oss-cn-hangzhou.aliyuncs.com"
});

@Controller()
export class AppController {
  constructor() {
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file, @Body() body) {
    const stream = new StreamableFile(file.buffer);
    const url = `${body.dir}/${nanoid(12)}.jpg`;
    const res = await client.putStream(url, stream.getStream());
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
