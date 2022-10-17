import { Moderator } from '../../../../domain/entities/Moderator'
import { UserRepository } from '../../../../domain/repositories/UserRepository'
import { Bcrypt } from '../../../../infra/adapters/Bcrypt'

export class CreateModerator {
    constructor(
        readonly userRepository: UserRepository,
        readonly bcrypt: Bcrypt
    ) { }

    async execute(input: CreateModeratorInput): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(input.email)
        if (existingUser) throw new Error('user already exists')
        const moderator = new Moderator(
            input.name,
            input.username,
            input.email,
            input.password
        )
        const encryptedPassword = this.bcrypt.encrypt(moderator.password.getValue())
        moderator.password.setValue(encryptedPassword)
        await this.userRepository.save(moderator)
    }
}

type CreateModeratorInput = {
    name: string,
    username: string,
    email: string,
    password: string
}
