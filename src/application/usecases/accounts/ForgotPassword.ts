import { Token } from '../../../domain/entities/Token'
import { Email } from '../../../domain/entities/valueobjects/Email'
import { TokenRepository } from '../../../domain/repositories/TokenRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { Queue } from '../../../infra/adapters/Queue'
import { Sign } from '../../../infra/adapters/Sign'

export class ForgotPassword {
    email: Email
    
    constructor(
        readonly userRepository: UserRepository,
        readonly tokenRepository: TokenRepository,
        readonly sign: Sign,
        readonly queue: Queue
    ) { }

    async execute(email: string): Promise<void> {
        this.email = new Email(email)
        const existingUser = await this.userRepository.findByEmail(this.email.getValue())
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
