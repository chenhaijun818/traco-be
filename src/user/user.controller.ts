import { Controller, Get, Param } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor() {
  }

  @Get("getCode")
  getCode(@Param() param) {
    const { phone } = param;
    if (!phone) {
      return {
        code: 101001,
        data: "",
        message: "手机号有误"
      };
    }
    const code = Math.floor(Math.random() * 900000) + 100000;
    return {
      code: 200,
      data: code,
      message: "success"
    };
  }
}
