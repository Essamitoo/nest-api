import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import prisma from 'src/prisma.service'

@Injectable()
export class UserService {
  async getUsers() {
    return await prisma.user.findMany()
  }

  async getUserById(id: number) {
    const userFound = await prisma.user.findFirst({ where: { id } })
    if (!userFound)
      return new NotFoundException(`User with id ${id} not found!`)
    return userFound
  }

  async createUser(user: CreateUserDto) {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        age: user.age,
      },
    })
    return newUser
  }

  async deleteUser(id: number) {
    const userFound = await prisma.user.findFirst({ where: { id } })
    if (!userFound)
      return new NotFoundException(`User with id ${id} not found!`)
    await prisma.user.delete({ where: { id } })
    return 'User deleted successfully!'
  }
}
