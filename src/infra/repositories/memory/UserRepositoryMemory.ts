import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export class UserRepositoryMemory implements UserRepository {
    users: User[] = []

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

    async findAll(): Promise<User[]> {
        return this.users
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email.getValue() === email)
    }
}
