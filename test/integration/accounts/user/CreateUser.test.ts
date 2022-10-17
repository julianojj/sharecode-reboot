import { CreateUser } from '../../../../src/application/usecases/accounts/user/CreateUser'
import { Bcrypt } from '../../../../src/infra/adapters/Bcrypt'
import { UserRepositoryMemory } from '../../../../src/infra/repositories/memory/UserRepositoryMemory'

test('Not should create user if user already exists', async () => {
    const userRepository = new UserRepositoryMemory()
    const hash = new Bcrypt()
    const createUser = new CreateUser(userRepository, hash)
    const input = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createUser.execute(input)
    await expect(createUser.execute(input)).rejects.toThrowError('user already exists')
})

test('Should create user', async () => {
    const userRepository = new UserRepositoryMemory()
    const hash = new Bcrypt()
    const createUser = new CreateUser(userRepository, hash)
    const input = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createUser.execute(input)
    const users = await userRepository.findAll()
    expect(users).toHaveLength(1)
    expect(users[0].name).toBe('Juliano')
    expect(users[0].type).toBe('user')
})
