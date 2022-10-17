import { Token } from '../entities/Token'

export interface TokenRepository {
    save(token: Token): Promise<void>
    findAll(): Promise<Token[]>
}
