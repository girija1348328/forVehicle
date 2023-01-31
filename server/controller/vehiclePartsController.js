const { compareSync } = require("bcrypt")
const partsModel = require("../models/vehiclePartsModel")

const createParts = async function(req,res){
try{
    let data = req.body
    const result = await partsModel.create(data)
    return res.status(200).send({status:true,message:"created successfully",data:result})
}

catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

//get
const getParts = async function(req,res){
   try{ 
    let result = await partsModel.find()
    return res.status(200).send({status:false,message:"parts are here",data:result})}

    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

//update

const updateParts = async function(req,res){
    try{
        let partsId = req.params.partsId
        let data = req.body

        const {company,partsName} = data

        let result = await partsModel.findOneAndUpdate({_id:partsId},{$set:{
            company:company,
            partsName:partsName
        }},{new:true})
        
        return res.status(200).send({status:false,message:"updated",data:result})
    
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

    //delete
const deleteParts = async function(req,res){
    try{
        let partsId = req.params.partsId
        

        await partsModel.findOneAndUpdate({_id:partsId},{$set:{
            isDeleted:true
        }},{new:true})

        return res.status(200).send({status:true,message:"successfully deleted"})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }

}

module.exports = {createParts,getParts,updateParts,deleteParts}