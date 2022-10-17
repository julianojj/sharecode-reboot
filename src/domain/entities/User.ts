import { randomUUID } from 'crypto'
import { Email } from './valueobjects/Email'
import { Password } from './valueobjects/Password'

export class User {
    id: string
    email: Email
    password: Password

    constructor(
        readonly name: string,
        readonly username: string,
        email: string,
        password: string,
        readonly type: string = 'user'
    ) { 
        this.id = randomUUID()
        this.email = new Email(email)
        this.password = new Password(password)
    }
}
