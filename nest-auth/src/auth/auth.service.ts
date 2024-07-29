import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { SignInAuthDto } from './dto/sign-in.dto';
import { SignUpAuthDto } from './dto/sign-up.dto';


// const configService = new ConfigService()
const DATABASE_SERVICE_URL = process.env.DATABASE_SERVICE_URL || "http://localhost:3001"
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async singUp(signUpAuthDto: SignUpAuthDto) {
    try {
      console.log({ signUpAuthDto })

      const response = await fetch(`${DATABASE_SERVICE_URL}/user`
        , {
          headers: {
            'Content-type': "application/json"
          },
          method: "POST",
          body: JSON.stringify(signUpAuthDto)
        })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  }


  async singIn(signInAuthDto: SignInAuthDto): Promise<{ accessToken: string }> {
    try {
      const response = await fetch(`${DATABASE_SERVICE_URL}/user/findByEmail/${signInAuthDto.email}`
        , {
          method: "get",
        })
      const user = await response.json()

      // const user = await this.userService.findByEmail(signInAuthDto.email)
      console.log({ user })
      if (!user) {
        throw new UnauthorizedException()
      }

      const isPasswordEqueal = user.password === signInAuthDto.password
      if (!isPasswordEqueal) {
        throw new UnauthorizedException()
      }
      const payload = {
        sub: user.id,
        email: user.email,
        // name: user.name,
        // role:user.role
      }
      const token = await this.generateToken(payload)

      return { accessToken: token }
    } catch (error) {
      console.error(error)
      return error


    }
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: SignInAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async generateToken(payload: Record<string, any>) {
    const token = await this.jwtService.signAsync(payload)
    return token
  }



  async validateUser(email: string, password: string): Promise<any> {
    const response = await fetch(`${DATABASE_SERVICE_URL}/user/findByEmail/${email}`
      , {
        method: "get",
      })
    const user = await JSON.parse(await response.json())

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
