import { Body, Controller, Get, Post, Query, Headers } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { sign, verify } from "jsonwebtoken";
import ms from "ms";
import Redis from "ioredis";
import { UserDocument, User } from "../models/user";

const redis = new Redis();

@Controller("user")
export class UserController {
  constructor(@InjectModel("User") private userModel: Model<UserDocument>) {
  }

  @Get("getCode")
  async getCode(@Query() query) {
    const { phone } = query;
    let code: string = await redis.get(`sms${phone}`);
    if (code) {
      return {
        code: 101001,
        message: "请求频繁"
      };
    }
    code = (Math.floor(Math.random() * 900000) + 100000).toString();
    redis.set(`sms${phone}`, code, "EX", 3600);
    return {
      code: 200,
      data: code,
      message: "success"
    };
  }

  @Post("login")
  async login(@Body() body) {
    const { phone, code } = body;
    const correctCode = await redis.get(`sms${phone}`);

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
      user = await this.userModel.create({ phone, name: `TL${phone.slice(-4)}` });
    }

    const token = sign({ phone: user.phone, name: user.name }, "123456", { expiresIn: ms("30s") });
    return {
      code: 200,
      data: { token, user },
      message: "success"
    };
  }

  @Get("getUser")
  getUser(@Headers() headers) {
    const [_, token] = headers["authorization"].split(" ");
    const userInfo = verify(token, "123456");
    return this.userModel.findOne({phone: userInfo.phone}).exec();
  }

  @Post("create")
  async createUser(@Body() body) {
    let res = await this.userModel.create({
      phone: body.phone,
      name: body.name
    });
    console.log(res);
  }
}
