import { User } from '../entities/User'

export interface UserRepository {
    save(user: User): Promise<void>
    findAll(): Promise<User[]>
    find(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
    update(user: User): Promise<void>
    clean(): Promise<void>
}
