import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Service from "./pages/ServiceForm"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VehicleParts from "./pages/VehicleParts/index"
import "./App.css";

function App() {
	const [user, setUser] = useState(localStorage.getItem("token"));
	// const [user2,setUserTwo] = useState(null)
	// const user = localStorage.getItem("token");

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
			} catch (err) {
			console.log(err);
		}
	};

	// const getUserByDB = async () =>{
	// 	try {
	// 		const url = `${process.env.REACT_APP_API_URL}/getUser`;
	// 		const { data } = await axios.get(url, { withCredentials: true });
	// 		setUserTwo(data.user._json);
	// 		} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	useEffect(() => {
		getUser();
		
	}, []);

	return (
		<div className="container">
			<Routes>
			
				{/* <Route
					exact
					path="/"
					element={user|| token? <Home user={user} /> : <Navigate to="/login" />}
					// element = {<Home/>}
				/> */}
				{user && <Route path="/" exact element={<Home />} />}
				<Route exact path="/login" element={<Login />}/>
			
				<Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />}/>
				<Route path="/service" exact element={<Service />}/>
				<Route path ="/vehicleParts" exact element={<VehicleParts />}/>
				
			</Routes>
		
			
		</div>
	);
}

export default App;