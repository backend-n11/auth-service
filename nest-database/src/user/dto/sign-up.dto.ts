import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"


export class SignUpAuthDto {

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsStrongPassword()
  password: string
}
