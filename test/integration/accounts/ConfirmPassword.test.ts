import 'dotenv/config'
import { ConfirmPassword } from '../../../src/application/usecases/accounts/ConfirmPassword'
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

test('Not should confirm password if user not found', async () => {
    const userRepository = new UserRepositoryMemory()
    const tokenRepository = new TokenRepositoryMemory()
    const hash = new Bcrypt()
    const sign = new Jwt()
    const createUser = new CreateUser(userRepository, hash)
    const inputCreateUser = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createUser.execute(inputCreateUser)
    const forgotPassword = new ForgotPassword(userRepository, tokenRepository, sign, mockedQueue)
    await forgotPassword.execute(inputCreateUser.email)
    const confirmPassword = new ConfirmPassword(tokenRepository, userRepository, sign, hash)
    const [token] = await tokenRepository.findAll()
    const inputConfirmPassword = {
        token: token.token,
        password: '1234567'
    }
    await userRepository.clean()
    await expect(confirmPassword.execute(inputConfirmPassword))
        .rejects.toThrowError('user not found')
})

test('Should confirm password', async () => {
    const userRepository = new UserRepositoryMemory()
    const tokenRepository = new TokenRepositoryMemory()
    const hash = new Bcrypt()
    const sign = new Jwt()
    const createUser = new CreateUser(userRepository, hash)
    const inputCreateUser = {
        name: 'Juliano',
        username: 'juliano',
        email: 'juliano@test.com',
        password: '123456'
    }
    await createUser.execute(inputCreateUser)
    const forgotPassword = new ForgotPassword(userRepository, tokenRepository, sign, mockedQueue)
    await forgotPassword.execute(inputCreateUser.email)
    const confirmPassword = new ConfirmPassword(tokenRepository, userRepository, sign, hash)
    const [token] = await tokenRepository.findAll()
    const inputConfirmPassword = {
        token: token.token,
        password: '1234567'
    }
    await confirmPassword.execute(inputConfirmPassword)
    const user = await userRepository.findByEmail(inputCreateUser.email)
    expect(hash.decrypt(inputConfirmPassword.password, user.password.getValue())).toBeTruthy()
})
