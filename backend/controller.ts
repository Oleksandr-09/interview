import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, TransferCreditsDto } from "./create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query("search") search: string) {
    return this.usersService.findAllUsers(search);
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    const user = await this.usersService.getUserDetails(id);

    return user;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post("transfer")
  async transfer(@Body() dto: TransferCreditsDto) {
    return this.usersService.transferCredits(dto);
  }
}
