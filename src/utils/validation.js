const joi = require('joi');

const registerValidation = (data) => {
    
    const schema = joi.object({
        name: joi.string()
            .alphanum()
            .required(),

        email: joi.string()
            .email()
            .required(),
        
        password: joi.string()
            .required()
    });

    return schema.validate(data);
}

const loginValidation = (data) => {

    const schema = joi.object({
        email: joi.string()
            .email()
            .required(),
        
        password: joi.string()
            .required()
    });

    return schema.validate(data);
}

const userUpdateValidation = (data) => {

    const schema = joi.object({
        email: joi.string()
            .email()
            .required(),
    });

}

const postValidation = (data) => {

    const schema = joi.object({
        title: joi.string()
            .required(),
        
        description: joi.string()
            .required()
    });
    
    return schema.validate(data);
}

module.exports = { registerValidation, loginValidation, userUpdateValidation, postValidation };