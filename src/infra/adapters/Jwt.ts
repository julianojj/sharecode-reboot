import jsonwebtoken from 'jsonwebtoken'
import { Sign } from './Sign'

export class Jwt implements Sign {
    encode(payload: any, expiresIn: string | number): string {
        return jsonwebtoken.sign(payload, process.env.JWT_KEY, {
            expiresIn
        })
    }

    decode(encodedToken: string): any {
        return jsonwebtoken.verify(encodedToken, process.env.JWT_KEY)
    }
}
