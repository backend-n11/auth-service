import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignUpAuthDto } from "./dto";
import { UserRepository } from "./repository/user.repository";



@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async create(signUpDto: SignUpAuthDto): Promise<Omit<User, 'password'>> {
    try {

      const user = this.userRepository.create(signUpDto)

      return user
    } catch (error) {
      console.log(error)
      return error

    }
  }


  async findAll(take: string, skip: string): Promise<User[]> {
    return this.userRepository.findAll(take, skip)
  }

  findOne(id: number) {
    return this.userRepository.findOne(id)
  }


  findByEmail(email: string) {
    return this.userRepository.findByEmail(email)
  }


}
