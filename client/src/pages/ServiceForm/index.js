import {  Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Service = () => {
    const [data, setData] = useState({ vehicleNumber: "", company: "", modelName: "", currentLocation: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/Service";
             let resp = await axios.post(url,data,
                {

                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    }

                });
         console.log(resp)
                navigate("/");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    const logout = () => {
      window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    };
    return (


      <div>	<nav className={styles.navbar}>
      <h1 className={styles.brand}>forVehicle</h1>
      <button className={styles.btn} onClick={logout}>
              Log Out
            </button>
    </nav>
        <div className={styles.member_container}>
            <div className={styles.member_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>book service</h1>
                        <input
                            type="text"
                            placeholder="Vehicle Number"
                            name="vehicleNumber"
                            onChange={handleChange}
                            value={data.vehicleNumber}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            onChange={handleChange}
                            value={data.company}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Model Name"
                            name="modelName"
                            onChange={handleChange}
                            value={data.modelName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Current Location"
                            name="currentLocation"
                            onChange={handleChange}
                            value={data.currentLocation}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Submit
                        </button>
                        <Link to ={"/"}>
                        <button type="normal" className={styles.green_btn}>
                            back_
                        </button>
                        </Link>
                        

                    </form>
                </div>

            </div>
        </div>
        </div>
    );
};

export default Service;