import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {useState} from 'react';
import axios from "axios"

function Login() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	const navigate = useNavigate()
	const [data, setData] = useState({
		email: "",
		password: "",
	})
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	}
	const [error, setError] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const url = "http://localhost:8080/loginUser";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.user);
			navigate("/")
			
			console.log(res.message)
		}
		catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}

	}
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Members Log in</h2>
					<input 
					type="email"
						placeholder="Email"
						name='email'
						onChange={handleChange}
						value={data.email}
					
						className={styles.input}

					/>
					<input 
					type="password"
						placeholder="Password"
						name='password'
						onChange={handleChange}
						value={data.password}
						
						className={styles.input}

					/>
						{error && <div className={styles.error_msg}>{error}</div>}
					<button className={styles.btn}>Log In</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
					<p className={styles.text}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</form>
		</div>
	);
}

export default Login;