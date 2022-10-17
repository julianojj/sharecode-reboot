import { randomUUID } from 'crypto'

export class Token {
    id: string

    constructor(
        readonly userId: string,
        readonly token: string,
        readonly type: string,
        readonly expiresIn: Date
    ) {
        if (this.isExpired()) throw new Error('expired token')
        this.id = randomUUID()
    }

    private isExpired(currentDate: Date = new Date()) {
        return currentDate.getTime() > this.expiresIn.getTime()
    }
}
