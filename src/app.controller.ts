import { Controller, Get, Post, UploadedFile, UseInterceptors, StreamableFile } from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import { join } from "path";
import * as process from "process";
import * as OSS from "ali-oss";
import { AccessKeyId, AccessKeySecret } from "./core/configs/ali-oss";

const client = new OSS({
  accessKeyId: AccessKeyId,
  accessKeySecret: AccessKeySecret,
  bucket: 'lizen',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com'
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file): Promise<any> {
    const stream = new StreamableFile(file.buffer);
    const url = `avatar/rjjsbx.jpg`;
    return client.putStream(url, stream.getStream());
  }

  @Get("getFile")
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "src/statics/rjjsbx.jpg"));
    return new StreamableFile(file);
  }

}
