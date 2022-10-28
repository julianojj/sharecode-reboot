import { TokenRepository } from '../../../domain/repositories/TokenRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { Hash } from '../../../infra/adapters/Hash'
import { Sign } from '../../../infra/adapters/Sign'

export class ConfirmPassword {
    constructor(
        readonly tokenRepository: TokenRepository,
        readonly userRepository: UserRepository,
        readonly sign: Sign,
        readonly hash: Hash
    ) { }

    async execute(input: ConfirmPasswordInput): Promise<void> {
        const existingToken = await this.tokenRepository.findByToken(input.token)
        if (!existingToken) throw new Error('token not found')
        let tokenOutput = null
        try {
            tokenOutput = this.sign.decode(existingToken.token)
        } catch (err) {
            console.log(err)
            throw new Error('invalid token')
        }
        const existingUser = await this.userRepository.find(tokenOutput.id)
        if (!existingUser) throw new Error('user not found')
        const encryptedPassword = this.hash.encrypt(input.password)
        existingUser.password.setValue(encryptedPassword)
        this.userRepository.update(existingUser)
    }
}

type ConfirmPasswordInput = {
    token: string,
    password: string
}
