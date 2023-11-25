import jwt, { TokenExpiredError } from 'jsonwebtoken'
import {unauthorized} from './handleError'

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization
    if (!token) return unauthorized('Required authorization', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            const isChecked = err instanceof TokenExpiredError
            if (!isChecked) return unauthorized('Access token invalid', res, isChecked) 
            if (isChecked) return unauthorized('Access token expired', res, isChecked) 
        }
        req.user = decode
        next()
    })
}

export default verifyToken