const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")
const serviceController = require("../controller/serviceController")
const partsController = require("../controller/vehiclePartsController")


//user
router.post("/createUser",userController.createUser)
router.post("/loginUser",userController.userLogin)
router.get("/getUser",userController.getUser)


//service
router.post("/Service",serviceController.createService)
router.put("/serviceUpdate/:userId",serviceController.updateService)
router.delete("/serviceCancel/:serviceId",serviceController.deleteService)

//parts
router.post("/addParts",partsController.createParts)
router.get("/getParts",partsController.getParts)
router.put("/updateParts/:partsId",partsController.updateParts)
router.delete("/deleteParts/:partsId",partsController.deleteParts)





module.exports = router