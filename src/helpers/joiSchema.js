import joi from 'joi'

export const email = joi.string().pattern(new RegExp('gmail.com$')).required()
export const password = joi.string().min(6).required()
export const title = joi.string().required()
export const price = joi.number().required()
export const available = joi.number().required()
export const image = joi.string().required()
export const category_code = joi.string().uppercase().alphanum().required()