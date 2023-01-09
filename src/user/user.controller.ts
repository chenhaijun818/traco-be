import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { sign } from "jsonwebtoken";
import Redis from "ioredis";
import { UserDocument, User } from "../models/user";
import { ConfigService } from "@nestjs/config";


@Controller("user")
export class UserController {
  redis = null;

  constructor(@InjectModel("User") private userModel: Model<UserDocument>, private config: ConfigService) {
    this.redis = new Redis({
      host: config.get("REDIS_HOST"),
      port: 6379,
      password: config.get("REDIS_PASSWORD")
    });
  }

  @Get("getCode")
  async getCode(@Query() query) {
    const { phone } = query;
    let code: string = await this.redis.get(`sms${phone}`);
    if (code) {
      return {
        code: 101001,
        data: code,
        message: "请求频繁"
      };
    }
    code = (Math.floor(Math.random() * 900000) + 100000).toString();
    this.redis.set(`sms${phone}`, code, "EX", 60);
    return {
      code: 200,
      data: { code },
      message: "success"
    };
  }

  @Post("login")
  async login(@Body() body) {
    const { phone, code } = body;
    const correctCode = await this.redis.get(`sms${phone}`);

    // 验证码错误
    if (code !== correctCode) {
      return {
        code: 101002,
        message: "验证码错误"
      };
    }

    let user = await this.userModel.findOne({ phone }).exec();
    // 用户不存在，则直接创建
    if (!user) {
      user = await this.userModel.create({
        phone,
        name: `TL${phone.slice(-4)}`,
        avatar: "https://traco-oss.oss-cn-hangzhou.aliyuncs.com/avatars/default-avatar.jpg",
        desc: "暂无简介"
      });
    }

    const token = sign({ id: user._id, phone: user.phone }, "123456", { expiresIn: "7d" });
    return {
      code: 200,
      data: { token, user },
      message: "success"
    };
  }

  @Post("update")
  async updateUser(@Req() req, @Body() body) {
    const res = await this.userModel.findByIdAndUpdate(req.user.id, body).exec();
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }

  @Get("getUser")
  async getUser(@Req() req) {
    const res = await this.userModel.findById(req.user.id).exec();
    return {
      code: 200,
      data: res,
      message: "success"
    };
  }

}
