import styles from "./styles.module.css";
import {  Link, useNavigate } from "react-router-dom";


function Home() {
	// const user = userDetails.user;
	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem("token")
		// window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
		navigate("/login")
		

	};
	
	return (
		
	<div>
	<nav className={styles.navbar}>
		<h1 className={styles.brand}>forVehicle</h1>
		<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
	</nav>
	<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
				<Link to = {"/vehicleParts"}>
					<button className={styles.btn}>
					Parts
					</button>
					</Link>
				</div>
				
				<div className={styles.right}>
				   <Link to = {"/service"}>
					<button className={styles.btn}>
						Service 
					</button>
					</Link>
				
				
				</div>
			</div>
		</div>
		</div>
	);
}

export default Home;