import * as services from "../../../services"
import { interalServerError, badRequest } from "../../middlewares/handleError"
import { bookId } from "../../../helpers/joiSchema"
import joi from "joi"
const cloudinary = require('cloudinary').v2;


export const updateBook = async(req, res) => {
    try {
        const fileData = req.file 
        const { error } = joi.object({ bookId }).validate({ bookId: req.body.bookId })
        if (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }
        const response = await services.updateBook(req.body, fileData)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}