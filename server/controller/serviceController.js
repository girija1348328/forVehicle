const serviceModel = require("../models/serviceModel")
const userModel = require("../models/userModel")


const createService = async function (req, res) {

    try {
        const data = req.body
        const result = await serviceModel.create(data)
        return res.status(200).send({ status: true, message: "service booked", data: result })
    }

    catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

const updateService = async function (req, res) {
    try {
        const data = req.body
        const userId = req.params.userId
        console.log(userId)

        let { serviceId, vehicleNumber, company, modelName, currentLocation } = data

        const isUser = await userModel.findOne({ _id: userId })
        if (!isUser) return res.status(404).send({ status: false, Message: ` user is unavailable` })


        const updateOrder = await serviceModel.findOneAndUpdate({ _id: serviceId }, {
            $set: {
                vehicleNumber: vehicleNumber,
                company: company,
                modelName: modelName,
                currentLocation: currentLocation
            }
        }, { new: true })

        console.log(updateOrder)

        return res.status(200).send({ status: true, message: "service updated successfully", data: updateOrder })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteService = async function (req, res) {

    try {
        let data = req.params.serviceId

        await serviceModel.findByIdAndUpdate({ _id: data }, { isDeleted: true })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

module.exports = { createService, updateService, deleteService }