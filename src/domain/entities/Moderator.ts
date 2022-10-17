import { User } from './User'

export class Moderator extends User {
    constructor(
        readonly name: string,
        readonly username: string,
        email: string,
        password: string
    ) { 
        super(name, username, email, password, 'moderator')
    }
}
