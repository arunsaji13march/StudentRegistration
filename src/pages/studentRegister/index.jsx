import Lottie from "react-lottie-player"
import lottieJson from '../../assets/json/lottie.json';
import './style.css'
import { useState, useRef } from "react";
import { addStudent } from "../../utils/dataApi";
import { toast } from 'react-toastify';


const initialFormdata = {
    name: "",
    email: "",
    blood_group: "",
    mobile: "",
    profile_image: "",
    id: "",
    "10_memo": "",
    "allotment_order": "",
    "id_proof": ""
}

export default function StudentRegistration() {
    const [profileImg, setProfileImg] = useState('')
    const [memoImg, setMemoImg] = useState("")
    const [idProofImg, setIdProofImg] = useState("")
    const [allotmentImg, setAllotmentImg] = useState("")
    const formDataRef = useRef(initialFormdata)

    const profileImgBtn = (e) => {
        // create a object url from the file
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setProfileImg(objectUrl)
    }

    const onInputChange = (e) => {
        const { name, value } = e.target
        formDataRef.current[name] = value
        console.log(formDataRef.current)
    }

    const onFileUpload = (e) => {
        // get the file from the event
        const file = e.target.files[0]

        if (e.target.name === "profile-image") {
            profileImgBtn(e)
            formDataRef.current.profile_image = file
        } else if (e.target.name === "id_proof") {
            setIdProofImg(file)
        }
        else if (e.target.name === "10_memo") {
            setMemoImg(file)
        }
        else if (e.target.name === "allotment_order") {
            setAllotmentImg(file)
        }

        formDataRef.current[e.target.name] = file
    }

    const onSubmitBtn = () => {

        // check if the form is valid
        if (formDataRef.current.name === "" || formDataRef.current.email === "" || formDataRef.current.blood_group === "" || formDataRef.current.mobile === "" || formDataRef.current.profile_image === "" || formDataRef.current.id === "" || formDataRef["10_memo"] === "" || formDataRef["allotment_order"] === "" || formDataRef["id_proof"] === "") {

            toast.warn('Please fill all the fields.', {
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

        addStudent(formDataRef.current)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    toast.success('Student added successfully.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    formDataRef.current = initialFormdata;
                    setProfileImg("")
                    setMemoImg("")
                    setIdProofImg("")
                    setAllotmentImg("")
                    // window.location.reload(false)
                } else {
                    toast.warning(res.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch(err => {
                toast.error("Failed To Apply", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    return (
        <div className="stu-page">
            <div className="stu-regis-page">
                <div className="form">
                    <div className="user-image">
                        <Lottie
                            loop
                            animationData={lottieJson}
                            play
                            style={{ width: 250, height: 250, margin: "auto" }}
                        />
                        <div className="profile-image" style={{ backgroundImage: `url(${profileImg})` }}></div>
                    </div>
                    <input type="text" placeholder="ID" name="id" required onChange={onInputChange} />
                    <input type="text" placeholder="Name" name="name" required onChange={onInputChange} />
                    <input type="text" placeholder="Mobile" name="mobile" required onChange={onInputChange} />
                    <input type="text" placeholder="Email" name='email' required onChange={onInputChange} />
                    <input type="text" placeholder="Blood" name="blood_group" required onChange={onInputChange} />
                    <label htmlFor="profile-image" style={profileImg ? {color:'green'}  : {}}>{profileImg ? "Uploaded (profile image)" : "Profile Photo"}</label>
                    <label htmlFor="10-image" style={memoImg ? {color:'green'}  : {}}>{ memoImg ? "Uploaded (memo)" : "10 Memo"}</label>
                    <label htmlFor="allotment-image" style={allotmentImg ? {color:'green'}  : {}}>{allotmentImg ? "Uploaded (allotment order)" : "Allotment Order"}</label>
                    <label htmlFor="id-image" style={idProofImg ? {color:'green'}  : {}}>{idProofImg ? "Uploaded (id proof)" : "Id Proof"}</label>
                    <input type="file" name="profile-image" id="profile-image" onChange={onFileUpload} hidden accept="image/png, image/jpeg" />
                    <input type="file" name="10_memo" id="10-image" onChange={onFileUpload} hidden accept="image/png, image/jpeg" />
                    <input type="file" name="allotment_order" id="allotment-image" onChange={onFileUpload} hidden accept="image/png, image/jpeg" />
                    <input type="file" name="id_proof" id="id-image" onChange={onFileUpload} hidden accept="image/png, image/jpeg" />
                    <br />
                    <br />
                    <button onClick={onSubmitBtn}>Apply</button>
                </div>
            </div>
        </div>
    )
}

