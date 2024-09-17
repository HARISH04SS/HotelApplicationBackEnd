require('dotenv').config();
const mongodb_url = process.env.mongodburl;
const jwt_secret = process.env.jwt_secret;
module.exports ={
    mongodb_url,
    jwt_secret
};