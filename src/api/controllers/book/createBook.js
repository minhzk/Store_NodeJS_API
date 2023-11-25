import * as services from "../../../services"
import { interalServerError, badRequest } from "../../middlewares/handleError"
import { title, price, available, image, category_code, description } from "../../../helpers/joiSchema"
import joi from "joi"
const cloudinary = require('cloudinary').v2;


export const createBook = async(req, res) => {
    try {
        const fileData = req.file 
        const { error } = joi.object({ title, price, available, image, category_code, description }).validate({...req.body, image: fileData?.path})
        if (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }
        const response = await services.createBook(req.body, fileData)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}