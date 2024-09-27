// @ts-nocheck
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const secret_key=process.env.JWT_SECRET;

function generateToken(userId){
    return jwt.sign({ userId }, secret_key, { expiresIn: "1hr" });
}

function verifyToken(token){
    return jwt.verify(token, secret_key);
}

async function hashPassword(password){
    const saltRounds=10;
    try{
        const salt=await bcrypt.genSalt(saltRounds);
        const hashedPassword=await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err){
        throw err;
    }
}

async function comparePassword(password, hashedPassword){
    try{
        const isMatch=await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

module.exports={
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword
}