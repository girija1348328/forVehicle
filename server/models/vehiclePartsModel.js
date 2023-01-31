const mongoose = require("mongoose")

const partsSchema = new mongoose.Schema({
    company : {type:String,required:true,trim:true},
    partsName : {type :String,required:true,trim:true},
    isDeleted: false
},
{
    timestamps : true
})

module.exports = mongoose.model('parts',partsSchema)