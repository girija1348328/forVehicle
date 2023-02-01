const mongoose = require('mongoose');

let isEmptyVar = function (value) {
    if(typeof value === "undefined" || typeof value === "null") return true;
    if(typeof value === "string" && value.trim().length == 0) return true;
    if(typeof value === "object" && Object.keys(value).length == 0) return true;
    return false;
}

let isREgexName = function (attribute) {
    return (/^[a-zA-Z_ ]{2,20}$/.test(attribute.trim()))
}
const isValidString = (String) => {
    return /\d/.test(String)
  }

const isValidPrice = (price) => {
    return /^[1-9]\d{0,7}(?:\.\d{1,2})?$/.test(price)
  }



let isValidPassword = function (password) {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return passwordRegex.test(password)
}

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId);   // to validate a MongoDB ObjectId we are use .isValid() method on ObjectId
};


let isEmptyFile = (file) => {
    if (!file || file.length == 0) return true
    return false
}

const acceptFileType = (file, ...types) => {
    return types.indexOf(file.mimetype) !== -1 ? true : false
}






module.exports = {
    isEmptyVar,isREgexName,isValidString,isValidPrice,isValidPassword,
    isValidObjectId,isEmptyFile,acceptFileType, 
}