var dynamo = require('dynamodb');
var Joi = require('joi');

const awsCredentials = {
    region: "us-east-1",
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey
};

dynamo.AWS.config.update(awsCredentials);

var Emails = dynamo.define('Emails', {
    hashKey: 'email',
    schema: {
        email: Joi.string(),
        user_id: Joi.string()
    },
    tableName: 'Emails'
});

const update = function (data) {
    return new Promise(function (resolve, reject) {
        return Emails.update(data, function (error, res) {
            if (error) {
                return reject(error)
            };
            return resolve(res) 
        })
    });
}

const get = function (col, data) {
    return new Promise(function(resolve, reject){
        return Emails.get({ [col]: data }, function (error, res) {
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