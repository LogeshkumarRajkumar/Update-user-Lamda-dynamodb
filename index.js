const user = require('./src/user');
const name = require('./src/name');
const email = require('./src/email');

const awsCredentials = {
    region: "us-east-1",
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey
};

const isUserAlreadyAvailable = async function (user) {
    var matchedNames = await name.get('name', user.name);
    if (matchedNames!=null) return matchedNames.attrs.user_id;

    var matchedEmails = await email.get('email', user.email);
    if (matchedEmails != null) return matchedEmails.attrs.user_id;
    return null;
};

const updateUser = async function (userReq) {
    const emailData = {
        email: userReq.email,
        user_id: userReq.user_id
    }
    try{
        var res = await email.update(emailData);
    }catch(err){
        throw err;
    }

    const nameData = {
        name: userReq.name,
        user_id: userReq.user_id
    }
    try{
        var res = await name.update(nameData);;
    }catch (err){
        throw err;
    }

    try
    {
        var res = await user.update(userReq);
    }
    catch (err){
        throw err;
    }
    return 'Successfully Updated';
}

function validate(user){
    return !user.name || !user.email ? false : true;
}

exports.handler = async function (event, context, callback) {
    const user = event;
    const isValidData = validate(user);
    if(isValidData==false){
        console.log("Empty UserName or Email");
        callback('Empty UserName or Email') ;       
    }
    var existingUser = await isUserAlreadyAvailable(user);
    console.log(existingUser);
    if (existingUser!=null) {
        user.user_id=existingUser;
        try {
            var res = await updateUser(user);
            callback(null, res);
        }
        catch (err) {
            console.log(err);
            callback('Some error occured'+e);
        }
    }
    else {
        callback('User Not available')
    }
};
