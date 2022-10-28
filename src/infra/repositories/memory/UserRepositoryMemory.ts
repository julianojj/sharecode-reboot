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

    async find(id: string): Promise<User> {
        return this.users.find(user => user.id === id)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email.getValue() === email)
    }

    async update(user: User): Promise<void> {
        const existingUser = await this.find(user.id)
        if (!existingUser) throw new Error('user not found')
        this.users.splice(this.users.indexOf(existingUser), 1, user)
    }

    async clean(): Promise<void> {
        this.users = []
    }
}
