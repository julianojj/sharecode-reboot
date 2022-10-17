import bcrypt from 'bcrypt'
import { Hash } from './Hash'

export class Bcrypt implements Hash {
    encrypt(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync())
    }
}
