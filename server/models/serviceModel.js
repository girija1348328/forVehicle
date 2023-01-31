const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    vehicleNumber : {type:String,required:true,trim:true},
    company : {type:String,required:true,trim:true},
    modelName : {type:String,required:true,trim:true},
    currentLocation : {type:String,required:true,trim:true},
    isDeleted : {type:Boolean,default:false}
},{
    timestamps :true
})

module.exports = mongoose.model("service",serviceSchema)