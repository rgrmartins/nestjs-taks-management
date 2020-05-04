import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDTO {
  
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // Regex para senha 1 Maiuscula, 1 Minuscula e 1 (número ou caracter especial)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password too weak' },
  )
  password: string;
}