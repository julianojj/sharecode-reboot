import { Token } from '../../../domain/entities/Token'
import { TokenRepository } from '../../../domain/repositories/TokenRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { Queue } from '../../../infra/adapters/Queue'
import { Sign } from '../../../infra/adapters/Sign'

export class ForgotPassword {
    constructor(
        readonly userRepository: UserRepository,
        readonly tokenRepository: TokenRepository,
        readonly sign: Sign,
        readonly queue: Queue
    ) { }

    async execute(email: string): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(email)
        if (!existingUser) return
        const expiresIn = new Date()
        expiresIn.setMinutes(expiresIn.getMinutes() + 15)
        const type = 'forgot_password'
        const encodedToken = this.sign.encode({ id: existingUser.id, type }, expiresIn.getMilliseconds())
        const token = new Token(
            existingUser.id,
            encodedToken,
            type,
            expiresIn
        )
        await this.tokenRepository.save(token)
        await this.queue.publish('passwordForgot', {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email
        })
    }
}
