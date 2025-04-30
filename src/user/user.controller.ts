import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers()
  }
  @Get('/:id')
  getUser(@Param('id') id: string){
    return this.userService.getUserById(parseInt(id))
  }
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(parseInt(id))
  }
}
