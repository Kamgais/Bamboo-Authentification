import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } from './jwt-keys'



interface Decoded  {
 valid: boolean;
 expired: boolean;
 decoded: string | JwtPayload | null
}


export const signJWT = (object: Object, options: jwt.SignOptions) => {
   return jwt.sign(object, JWT_PRIVATE_KEY, {
    ...(options && options ),
    algorithm: 'RS256'
   })
}

export const verifyJWT = (token: string): Decoded => {

    try {
        const decoded: string | JwtPayload = jwt.verify(token,JWT_PUBLIC_KEY)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }

}