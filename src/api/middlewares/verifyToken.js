import jwt from 'jsonwebtoken'
import {unauthorized} from './handleError'

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization
    if (!token) return unauthorized('Required authorization', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
       if (err) return unauthorized('Access token may be expired or invalid', res) 

       req.user = decode
       next()
    })
}

export default verifyToken