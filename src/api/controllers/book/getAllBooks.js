import * as services from "../../../services"
import { interalServerError } from "../../middlewares/handleError"

export const getAllBooks = async(req, res) => {
    try {
        const response = await services.getAllBooks(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}