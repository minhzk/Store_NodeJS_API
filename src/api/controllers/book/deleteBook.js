import * as services from "../../../services"
import { interalServerError, badRequest } from "../../middlewares/handleError"
import { bookIds, filename } from "../../../helpers/joiSchema"
import joi from "joi"


export const deleteBook = async(req, res) => {
    try {
        const { error } = joi.object({ bookIds, filename }).validate(req.query)
        if (error) {
            return badRequest(error.details[0].message, res)
        }
        const response = await services.deleteBook(req.query.bookIds, req.query.filename)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}