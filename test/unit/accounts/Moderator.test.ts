import { Moderator } from '../../../src/domain/entities/Moderator'

test('Should create moderator', () => {
    const moderator = new Moderator(
        'Juliano',
        'juliano',
        'juliano@test.com',
        '123456'
    )
    expect(moderator.type).toBe('moderator')
})
