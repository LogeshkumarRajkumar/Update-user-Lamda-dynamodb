var dynamo = require('dynamodb');
var Joi = require('joi');

const awsCredentials = {
    region: "us-east-1",
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey
};

dynamo.AWS.config.update(awsCredentials);

var Users = dynamo.define('Users', {
    hashKey: 'user_id',
    schema: {
        user_id: Joi.string(),
        name: Joi.string(),
        email: Joi.string().email(),
        title: Joi.string(),
        mobile_number: Joi.string(),
        address: {
            building: Joi.string(),
            pincode: Joi.string(),
            city: Joi.string(),
            state: Joi.string()
        },
        company: Joi.string()
    },
    tableName: 'Users'
});

const update = function (data) {
    return new Promise(function (resolve, reject) {
        return Users.update(data, function (error, res) {
            if (error) {
                return reject(error)
            };
            return resolve(res)
        })
    });
}

const get = function (col, data) {
    return new Promise(function (resolve, reject) {
        return Users.get({ [col]: data }, function (error, res) {
            console.log(res)
            if (error) {
                return reject(error)
            };
            return resolve(res)
        })
    });
}

module.exports = {
    update,
    get
};