import styles from "./styles.module.css";
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};

	const navigate = useNavigate();
	const [data, setData] = useState({
		userName: "",
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
			const url = "http://localhost:8080/createUser";
			const { data: res } = await axios.post(url, data);
			
			navigate("/login")
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
			<h1 className={styles.heading}>Sign up Form</h1>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/signup.jpg" alt="signup" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Create Account</h2>
					<input
						type="text"
						placeholder="Username"
						name='userName'
						onChange={handleChange}
						value={data.userName}
						required
						className={styles.input}
					/>

					<input
						type="email"
						placeholder="Email"
						name='email'
						onChange={handleChange}
						value={data.email}
						required
						className={styles.input}
					/>
					<input
						type="password"
						placeholder="Password"
						name='password'
						onChange={handleChange}
						value={data.password}
						required
						className={styles.input}
					/>
					{error && <div className={styles.error_msg}>{error}</div>}
					<button className={styles.btn} >Sign Up</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign up with Google</span>
					</button>
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</form>
		</div>
	);
}

export default Signup;