import { User } from '../../../src/domain/entities/User'

test('Not should create user if invalid email', () => {
    expect(() => new User(
        'Juliano',
        'juliano',
        'julianotest.com',
        '123456'
    )).toThrowError('invalid email')
})

test('Not should create user if invalid password', () => {
    expect(() => new User(
        'Juliano',
        'juliano',
        'juliano@test.com',
        '12345'
    )).toThrowError('invalid password')
})

test('Should create user', () => {
    const user = new User(
        'Juliano',
        'juliano',
        'juliano@test.com',
        '123456'
    )
    expect(user.type).toBe('user')
})
