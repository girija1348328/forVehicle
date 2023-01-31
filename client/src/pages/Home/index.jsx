import styles from "./styles.module.css";
import {  Link } from "react-router-dom";


function Home() {
	// const user = userDetails.user;
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
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
				<Link to ={"/parts"}>
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