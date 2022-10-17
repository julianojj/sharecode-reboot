import { Admin } from '../../../../domain/entities/Admin'
import { UserRepository } from '../../../../domain/repositories/UserRepository'
import { Bcrypt } from '../../../../infra/adapters/Bcrypt'

export class CreateAdmin {
    constructor(
        readonly userRepository: UserRepository,
        readonly bcrypt: Bcrypt
    ) { }

    async execute(input: CreateAdminInput): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(input.email)
        if (existingUser) throw new Error('user already exists')
        const admin = new Admin(
            input.name,
            input.username,
            input.email,
            input.password
        )
        const encryptedPassword = this.bcrypt.encrypt(admin.password.getValue())
        admin.password.setValue(encryptedPassword)
        await this.userRepository.save(admin)
    }
}

type CreateAdminInput = {
    name: string,
    username: string,
    email: string,
    password: string
}
