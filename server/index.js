require("dotenv").config();
const express = require("express");
const multer = require("multer")
const mongoose = require("mongoose")
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const route = require("./routes/route")
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();

app.use(express.json());
app.use(multer().any());

//monggose connection
mongoose.connect("mongodb+srv://linagodbole99:dAix1EtU6C6yxJDR@cluster0.oip3eje.mongodb.net/forVehicleGirija")
.then(()=>console.log("mongoDB successfully connected"))
.catch(err=>console.log(err))


//cookie
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//cors
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


//routes
app.use("/auth", authRoute);
app.use("/",route)


//server connection
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
