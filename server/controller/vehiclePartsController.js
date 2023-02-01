const partsModel = require("../models/vehiclePartsModel")
const uploadfile = require("../aws/driveController")
const { isEmptyVar, isREgexName, isValidObjectId, isEmptyFile } = require("../validator/validate")


const createParts = async function (req, res) {
    try {
        let requestbody = req.body
        let file = req.files
        const { partsName, description, productImage } = requestbody


        //partsName
        if (isEmptyVar(partsName)) return res.status(400), send({ status: false, message: "parts name required" })

        //description
        if (isEmptyVar(description)) return res.status(400), send({ status: false, message: "description required" })

        //productImage
        if (file && file.length > 0) {
            if (file[0].mimetype.indexOf('image') == -1) {
                return res.status(400).send({ status: false, message: "only image files are allowed" })
            }
            const profile_url = await uploadfile(file[0]);
            requestbody.productImage = "https://drive.google.com/uc?export=view&id=" + profile_url;
        }
        else {
            return res.status(400).send({ status: false, message: "profile image required" })
        }
        const result = await partsModel.create(requestbody)
        return res.status(201).send({ status: true, message: "created successfully", requestbody: result })
    }

    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//get
const getParts = async function (req, res) {
    try {
        let result = await partsModel.find()
        return res.status(200).send({ status: false, message: "parts are here", data: result })
    }

    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//update

const updateParts = async function (req, res) {
    try {
        let partsId = req.params.partsId
        let data = req.body
        let file = req.files

        const { partsName, description, productImage,price } = data

        let user = await partsModel.findById(partsId)
        if (!user) return res.status(404).send({ status: false, message: "user not available" })

        //partsName
        if (!isEmptyVar(partsName)) {
            if (!isREgexName(partsName)) return res.status(400).send({ status: false, Message: "Please provide name" })
            user.partsName = partsName
        }

        //description
        if (!isEmptyVar(description)) {
            if (!isREgexName(description)) return res.status(400).send({ status: false, Message: "Please provide description" })
            user.description = description
        }

        //productimage
        if (file && file.length > 0) {
            if (file[0].mimetype.indexOf('image') == -1) {
                return res.status(400).send({ status: false, message: "only image files are allowed" })
            }
            const profile_url = await uploadfile(file[0]);
            user.productImage = "https://drive.google.com/uc?export=view&id=" + profile_url;
        }
        else {
            return res.status(400).send({ status: false, message: "product image required" })
        }

        //price
        if (!price)return res.status(400).send({ status: false, Message: "Please provide price" })
        user.price = price
        


        await user.save();
        return res.status(200).send({ status: false, message: "updated", data: user })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//delete
const deleteParts = async function (req, res) {
    try {
        let partsId = req.params.partsId


        await partsModel.findOneAndUpdate({ _id: partsId }, {
            $set: {
                isDeleted: true
            }
        }, { new: true })

        return res.status(200).send({ status: true, message: "successfully deleted" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

module.exports = { createParts, getParts, updateParts, deleteParts }