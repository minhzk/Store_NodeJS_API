import db from '../models'

export const getUserById = (userId) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findByPk(userId, {
            attributes: { exclude: ['password', 'role_code'] }, // Loại bỏ trường password khi lấy dữ liệu
            include: [{
                model: db.Role, as: 'roleData', 
                attributes: ['id', 'code', 'value']
            }]
          })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'User retrieved successfully by ID.' : 'No user found with the provided ID.',
            userData: response
        })
    } catch (error) {
        reject(error)
    }
})