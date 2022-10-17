import { Admin } from '../../../src/domain/entities/Admin'

test('Should create admin', () => {
    const admin = new Admin(
        'Juliano',
        'juliano',
        'juliano@test.com',
        '123456'
    )
    expect(admin.type).toBe('admin')
})
