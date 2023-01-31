const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

    userName : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true,trim:true},


},
{timesStamps:true})
userSchema.pre('save',function(next){
    bcrypt.hash(this.password,10).then((encryptedPassword)=>{
        this.password =encryptedPassword;
        next()
    }).catch((error)=>{
        throw error;
    })
})

module.exports = mongoose.model("user",userSchema)