import { Token } from '../../../domain/entities/Token'
import { TokenRepository } from '../../../domain/repositories/TokenRepository'

export class TokenRepositoryMemory implements TokenRepository {
    tokens: Token[] = []
    
    async save(token: Token): Promise<void> {
        this.tokens.push(token)
    }

    async findAll(): Promise<Token[]> {
        return this.tokens
    }
}
