import 'dotenv/config'
import { ForgotPassword } from '../../../src/application/usecases/accounts/ForgotPassword'
import { CreateUser } from '../../../src/application/usecases/accounts/user/CreateUser'
import { Bcrypt } from '../../../src/infra/adapters/Bcrypt'
import { Jwt } from '../../../src/infra/adapters/Jwt'
import { Queue } from '../../../src/infra/adapters/Queue'
import { TokenRepositoryMemory } from '../../../src/infra/repositories/memory/TokenRepositoryMemory'
import { UserRepositoryMemory } from '../../../src/infra/repositories/memory/UserRepositoryMemory'

const mockedQueue: Queue = {
    connect: jest.fn(),
    publish: jest.fn()
}

test('Not should forgot password if user not found', async () => {
    const userRepository = new UserRepositoryMemory()
    const tokenRepository = new TokenRepositoryMemory()
    const sign = new Jwt()
    const forgotPassword = new ForgotPassword(userRepository, tokenRepository, sign, mockedQueue)
    const spy = jest.spyOn(mockedQueue, 'publish')
    await forgotPassword.execute('juliano@test.com')
    expect(spy).not.toHaveBeenCalled()
})

test('Should forgot password', async () => {
    const userRepository = new UserRepositoryMemory()
    const tokenRepository = new TokenRepositoryMemory()
    const hash = new Bcrypt()
    const sign = new Jwt()
    const createUser = new CreateUser(userRepository, hash)
    const input = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createUser.execute(input)
    const forgotPassword = new ForgotPassword(userRepository, tokenRepository, sign, mockedQueue)
    const spy = jest.spyOn(mockedQueue, 'publish')
    await forgotPassword.execute(input.email)
    expect(spy).toHaveBeenCalled()
    const tokens = await tokenRepository.findAll()
    expect(tokens).toHaveLength(1)
    expect(tokens[0].type).toBe('forgot_password')
})
