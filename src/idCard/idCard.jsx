import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { getStudent } from "../utils/dataApi";
import "./style.css";
import html2canvas from "html2canvas";


export default function IdCard() {
    let params = useParams();
    const [state, setState] = useState({})
    const ref = useRef(null)
    const getImage = () => {
        
        html2canvas(ref.current, {allowTaint: true, useCORS:true}).then((canvas) => {
            console.log(ref.current);
            const base64image = canvas.toDataURL("image/png");
            const link = document.createElement('a')
            link.download = 'my-image-name.png'
            link.href = base64image
            link.click()
        });
    }

    useEffect(() => {
        const studentId = params.studentId
        getStudent(studentId).then(res => {
            setState({ id: res.studentId, name: res.name, blood: res.blood, emailId: res.email, profileImage: `http://localhost:5000/files/${res.profileImageName}`, Contact: res.mobile })
        });

    }, [])

    return (<>
        <div className="main">
            <div className="cst-dn"><span onClick={getImage}>Download</span></div>
            <div className="card" id="card" ref={ref}>
                <div className="ds-top"></div>
                <div className="avatar-holder">
                    <img src={state.profileImage ? state.profileImage : ""}
                        alt="student name" />
                </div>
                <div className="name">
                    <h1>{state.name ? state.name.toUpperCase() : ""}</h1>
                    <br />
                </div>
                <div className="ds-skill">
                    {Object.keys(state).map((e, i) => {

                        if (e === "name" || e === "profileImage") { return <></> }

                        return <div className="skill html" style={{ marginBottom: "1rem" }}>
                            <h6 style={{ fontSize: "1rem" }}>{e}</h6>
                            <h3 style={{ fontSize: ".7rem", color: "white", paddingLeft: "1rem" }}>
                                {state[e]}
                            </h3>
                        </div>
                    })}
                </div>
            </div>
        </div>


    </>)
}