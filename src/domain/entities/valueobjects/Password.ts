export class Password {
    private value: string

    constructor(value: string) {
        if (!this.validate(value)) throw new Error('invalid password')
        this.value = value
    }

    getValue(): string {
        return this.value
    }

    setValue(password: string): void {
        if (!this.validate(password)) throw new Error('invalid password')
        this.value = password
    }

    private isInvalidLength(password: string): boolean {
        return password.length < 6
    }

    private validate(password: string): boolean {
        if (!password) return false
        return !this.isInvalidLength(password)
    }
}
