import { randomUUID } from 'crypto'
import { Token } from '../../src/domain/entities/Token'

test('Not should create token if expired token', () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 1)
    expect(() => new Token(
        randomUUID(),
        randomUUID(),
        randomUUID(),
        currentDate
    )).toThrowError('expired token')
})

test('Should create token', () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)
    const token = new Token(
        randomUUID(),
        randomUUID(),
        randomUUID(),
        currentDate
    )
    expect(token.expiresIn).toBe(currentDate)
})
