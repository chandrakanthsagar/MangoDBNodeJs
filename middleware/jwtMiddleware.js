const jwt = require('jsonwebtoken');

const secretKey = 'Nani_screat';

const generateToken = (user) =>{
    return jwt.sign({userId:user._id},secretKey,{expiresIn:'1h'});

}

const verifyToken = (token) =>{
    try{
        return jwt.verify(token,secretKey);
    }
    catch(err){
        throw new Error('Invalid token');
    }
};

module.exports = {generateToken,verifyToken};