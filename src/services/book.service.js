import db from '../models'
import { Op } from 'sequelize'
import { v4 as generateId} from 'uuid'
const cloudinary = require('cloudinary').v2;

export const getAllBooks = ({page, limit, order, name, available, ...query}) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true}
        const offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_BOOK
        queries.offset = offset * fLimit
        queries.limit = fLimit
        if (order) queries.order = [order]
        if (name) query.title = {[Op.substring]: name}
        if (available) query.available = { [Op.between]: available}
        const response = await db.Book.findAndCountAll({
            where: query,
            ...queries,
            attributes: { exclude: ['category_code']},
            include: [
                {
                    model: db.Category, 
                    attributes: { exclude: ['createdAt', 'updatedAt']}, 
                    as: 'categoryData'
                }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got books!' : 'Can not found books!',
            bookData: response
        })
    } catch (error) {
        reject(error)
    }
})

export const createBook = (body, fileData) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Book.findOrCreate({
            where: { title: body?.title },
            defaults: {
                ...body,
                id: generateId(),
                image: fileData?.path,
                filename: fileData?.filename
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Book added successfully!' : 'Book already exists',
        })
        if (fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)
    } catch (error) {
        reject(error)
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
    }
})

export const updateBook = ({bookId, image, ...body}, fileData) => new Promise( async (resolve, reject) => {
    try {
        const existingImageData = await db.Book.findByPk(bookId, { attributes: ['filename'] });

        if (fileData) {
            body.image = fileData?.path
            body.filename = fileData?.filename
        }
        const response = await db.Book.update(body, {
            where: {id: bookId}
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            mes: response[0] > 0 ? `${response[0]} book updated!` : 'Can not update book / Book ID not found',
            existingImageData: existingImageData 
        })
        
        if (existingImageData && response[0] > 0  && existingImageData.filename !== fileData.filename) {
            await cloudinary.uploader.destroy(existingImageData.filename, function(error,result) {
                console.log(result, error) })
        }
        if (fileData && response[0] === 0) cloudinary.uploader.destroy(fileData.filename, function(error,result) {
            console.log(fileData.filename);
            console.log(result, error) })
    } catch (error) {
        reject(error)
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
    }
})

export const deleteBook = (bookIds, filename) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Book.destroy({
            where: {id: bookIds}
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? `${response} book(s) deleted!` : 'Can not delete book / Book ID not found'
        })
        cloudinary.api.delete_resources(filename)
    } catch (error) {
        reject(error)
    }
})