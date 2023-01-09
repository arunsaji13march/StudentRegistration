import { useState, useRef } from "react";
import Lottie from "react-lottie-player"
import lottieJson from '../../assets/json/lottie.json';
import "./style.css"
import { adminLogin } from "../../utils/dataApi";
import { toast } from 'react-toastify';

const initialData = {
    username: "",
    password: ""
}

export default function Login() {
    const [showpwd, setShowpwd] = useState(false)
    const [submit, setSubmit] = useState(false)
    const loginData = useRef(initialData)
    const onSubmitBtn = () => {
        // check if the form is valid
        if (loginData.current.username.length === 0 || loginData.current.password.length === 0) {
            console.log(loginData.current);
            toast.warning("Please fill all the fields ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }
        setSubmit(true)
        adminLogin(loginData.current).then(res => {
            window.location.href = "/dashboard"
        }).catch(err => {
            toast.error("Invalid username or password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSubmit(false)
        })
    }

    const onChange = (e) => {
        const { name, value } = e.target
        loginData.current[name] = value
    }


    return (<div className="login-page">
        <div className="l-form">


            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 150, height: 150, margin: "auto" }}
            />

            <input type="text" name="username" placeholder="&#xf007;  username" required onChange={onChange} />
            <div className="pwd-container">
                <input name="password" type={showpwd ? "text" : "password"} id="password" placeholder="&#xf023;  password" required onChange={onChange} />
                <i className="fas fa-eye" onClick={() => setShowpwd(!showpwd)} style={{ cursor: "pointer" }}></i>
            </div>
            <br />
            <br />

            <button onClick={submit ? () => { } : onSubmitBtn} disabled={submit}>LOGIN</button>

        </div>
    </div>)
}