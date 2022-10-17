export interface Sign {
    encode(payload: any, expiresIn: string | number): string
}
