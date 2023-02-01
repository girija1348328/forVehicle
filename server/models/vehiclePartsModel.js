const mongoose = require("mongoose")

const partsSchema = new mongoose.Schema({
    partsName : {type:String,required:true,trim:true},
    description : {type :String,required:true,trim:true},
    productImage : {type : String,required:true,trim:true},
    price :{type:Number,required:true,trim:true},
    isDeleted: false
},
{
    timestamps : true
})

module.exports = mongoose.model('parts',partsSchema)