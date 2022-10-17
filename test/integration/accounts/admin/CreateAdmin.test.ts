import { CreateAdmin } from '../../../../src/application/usecases/accounts/admin/CreateAdmin'
import { Bcrypt } from '../../../../src/infra/adapters/Bcrypt'
import { UserRepositoryMemory } from '../../../../src/infra/repositories/memory/UserRepositoryMemory'

test('Not should create user if user already exists', async () => {
    const userRepository = new UserRepositoryMemory()
    const hash = new Bcrypt()
    const createAdmin = new CreateAdmin(userRepository, hash)
    const input = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createAdmin.execute(input)
    await expect(createAdmin.execute(input)).rejects.toThrowError('user already exists')
})

test('Should create user', async () => {
    const userRepository = new UserRepositoryMemory()
    const hash = new Bcrypt()
    const createAdmin = new CreateAdmin(userRepository, hash)
    const input = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createAdmin.execute(input)
    const users = await userRepository.findAll()
    expect(users).toHaveLength(1)
    expect(users[0].name).toBe('Juliano')
    expect(users[0].type).toBe('admin')
})
