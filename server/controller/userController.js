const userModel = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async function(req,res) {

    try {
        const data = req.body
        
        
        let response = await userModel.create(data)
        res.status(201).send({ status: true, message: "userCreate successfully" })
    }

    catch (err) {
        res.status(500).send({ status: false, err: err.message })
    }

}

const userLogin = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*")
    const data = req.body

    const{email,password} = data

    const user = await userModel.findOne({email})
    if(!user){return res.status(404).send({status:false,message:"wrong credentials"})}

    const verify = await bcrypt.compare(password,user.password)
    if(!verify){return res.status(404).send({status:false,message:"wrong credentials"})}


    const Token = jwt.sign({
        userId: user._id
    }, 'secret', {
        expiresIn: '10h'
    });

    // all good
    res.setHeader("x-access-token", Token);
    res.status(200).send({
        status: true,
        message: `User Logged-in Successfully!`,
        user:Token,
        data: {
            userId: user._id,
            userName : user.userName,
            email: user.email
        }
    })
}

const getUser = async function(req, res){
	try{
        const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'secret')
    const data = await userModel.findById(decoded.userId)
    if (data) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.data,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" ,data: user});
	}}

    catch(error){
        res.status(500).send({ status: false, error: error.message })
    }
};
module.exports = {createUser,userLogin,getUser}
