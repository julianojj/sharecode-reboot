import { User } from '../../../../domain/entities/User'
import { UserRepository } from '../../../../domain/repositories/UserRepository'
import { Bcrypt } from '../../../../infra/adapters/Bcrypt'

export class CreateUser {
    constructor(
        readonly userRepository: UserRepository,
        readonly bcrypt: Bcrypt
    ) { }

    async execute(input: CreateUserInput): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(input.email)
        if (existingUser) throw new Error('user already exists')
        const user = new User(
            input.name,
            input.username,
            input.email,
            input.password
        )
        const encryptedPassword = this.bcrypt.encrypt(user.password.getValue())
        user.password.setValue(encryptedPassword)
        await this.userRepository.save(user)
    }
}

type CreateUserInput = {
    name: string,
    username: string,
    email: string,
    password: string
}
