import { Controller, Get, Post, Body, Param, Delete, Put, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IUsers } from 'src/common/interface/user.interface';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get(':id')
    findOne(@Param() params): Promise<IUsers> {
        return this.userService.findOne(params.id);
    }

    @Post()
    create(@Body() user: CreateUserDto): Promise<IUsers> {
        return this.userService.createUser(user);
    }
}
