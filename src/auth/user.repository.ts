import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup (authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    /**
     *  TODO: A senha precisa ser criptograda primeiro antes de ser salva
     *  Podemos ter mais campos na criação de um usuário
     *  Setar de inicio um perfil
    */
    const user = new User();
    user.username = username;
    // Gerando um salt aleatório por usuário
    user.salt = await bcrypt.genSalt();;
    user.password = await this.hashPassword(password, user.salt);

    console.log(user.password);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') { // Duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}