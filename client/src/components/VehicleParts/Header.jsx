// import react from "react"
import styles from "./styles.module.css";


function Header(){
    const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};
    return(
     <div>
        <nav className={styles.navbar}>
		<h1 className={styles.brand}>forVehicle</h1>
		<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
	</nav>
     </div>
    )
}
export default Header