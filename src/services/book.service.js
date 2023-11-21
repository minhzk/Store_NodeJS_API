import db from '../models'

export const getAllBooks = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                email,
                password: hashPassword(password)
            }
        })
        const token = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Registration successful!' : 'This email address is already in use.',
            'access_token': token ? `Bearer ${token}` : token
        })
    } catch (error) {
        reject(error)
    }
})