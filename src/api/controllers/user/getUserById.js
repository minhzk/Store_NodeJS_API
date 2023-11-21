import * as services from "../../../services"
import { interalServerError, badRequest } from "../../middlewares/handleError"
// import {email, password } from "../../../helpers/joiSchema"
// import joi from "joi"

export const getCurrentUser = async(req, res) => {
    try {
        const { id } = req.user
        const response = await services.getUserById(id)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}