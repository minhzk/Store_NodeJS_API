import { unauthorized } from "./handleError"

export const isAdmin = (req, res, next) => {
    const {role_code} = req.user
    if (role_code !== 'R1') return unauthorized('Require role Admin', res)
    next()
}
export const isCreatorOrAdmin = (req, res, next) => {
    const {role_code} = req.user
    if (role_code !== 'R1' && role_code !== 'R2') return unauthorized('Require role Admin or Creator', res)
    next()
}