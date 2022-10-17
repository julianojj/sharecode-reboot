import { CreateModerator } from '../../../../src/application/usecases/accounts/moderator/CreateModerator'
import { Bcrypt } from '../../../../src/infra/adapters/Bcrypt'
import { UserRepositoryMemory } from '../../../../src/infra/repositories/memory/UserRepositoryMemory'

test('Not should create user if user already exists', async () => {
    const userRepository = new UserRepositoryMemory()
    const hash = new Bcrypt()
    const createModerator = new CreateModerator(userRepository, hash)
    const input = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createModerator.execute(input)
    await expect(createModerator.execute(input)).rejects.toThrowError('user already exists')
})

test('Should create user', async () => {
    const userRepository = new UserRepositoryMemory()
    const hash = new Bcrypt()
    const createModerator = new CreateModerator(userRepository, hash)
    const input = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createModerator.execute(input)
    const users = await userRepository.findAll()
    expect(users).toHaveLength(1)
    expect(users[0].name).toBe('Juliano')
    expect(users[0].type).toBe('moderator')
})
