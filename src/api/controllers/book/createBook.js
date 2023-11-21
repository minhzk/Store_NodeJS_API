import * as services from "../../../services"
import { interalServerError, badRequest } from "../../middlewares/handleError"
import { title, price, available, image, category_code } from "../../../helpers/joiSchema"
import joi from "joi"

export const createBook = async(req, res) => {
    try {
        const { error } = joi.object({ title, price, available, image, category_code}).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await services.createBook(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}