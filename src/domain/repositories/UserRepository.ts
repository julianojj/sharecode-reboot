import { User } from '../entities/User'

export interface UserRepository {
    save(user: User): Promise<void>
    findAll(): Promise<User[]>
    findByEmail(email: string): Promise<User>
}
