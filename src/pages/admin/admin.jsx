import { useState, useEffect, useRef } from "react"
import "./admin.css"
import { getDashboardData, approveStudent, rejectStudent } from "../../utils/dataApi"
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';


const initialState = [
    { imgUrl: "https://i.postimg.cc/yYYd1HV1/katara.jpg", userId: "1", name: "meera", mobile: "1234567890", email: "meera@svit.in", blood: "A+", status: "", update: "" },
    { imgUrl: "https://i.postimg.cc/yYYd1HV1/katara.jpg", userId: "1", name: "meera", mobile: "1234567890", email: "meera@svit.in", blood: "A+", status: "", update: "" },
]




export default function Admin() {
    const [students, setStudents] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [disabled, setDisable] = useState(false)
    const dataFetched = useRef(false)
    const reasonRef = useRef({})
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        if (!dataFetched.current) {
            dataFetched.current = true
            getDashboardData().then(res => {
                if (res.redirect) {
                    window.location.href = "/login"
                    return
                }
                res.pending.forEach(e => {
                    reasonRef.current[e.studentId] = ""
                })
                setStudents(res.pending)
                setLoading(false)
            }).catch(err => {
                console.log(err.message)
                if (err.message !== "Failed to fetch") {
                    // show toast   
                    toast.warn("Error fetching data", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
                // localStorage.clear()
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2000)
            })
        }

    }, [])

    const approve = (studentId) => {
        setDisable(true)
        approveStudent(studentId).then(res => {
            if (res.msg) {
                toast("Student Id Card generated", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
            else {
                toast.warn("Student Not Approved", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            setDisable(false)
        });
    }

    const getRefValue = (id) => reasonRef.current[id]
    const reject = (studentId) => {
        let value = getRefValue(studentId)
        console.log(value);
        setDisable(true)
        rejectStudent(studentId, value).then(res => {
            toast("Student Id Card Rejected", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setDisable(false)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        })
    }

    if (loading) {
        return (
            <div className="admin-loading">
                <ClipLoader color="blue" loading={loading} size={80} />
                <h2>Loading</h2>
            </div>
        )
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen ? true : false}
                onRequestClose={() => setIsOpen(false)}
                // style={customStyles}
                contentLabel="Example Modal"
            >

                <div style={{ height: '100%', width: "100%", display: "flex", flexDirection: 'column',position:'relative' }}>
                    <span className="close" onClick={() => setIsOpen(false)}>X</span>
                    <span style={{ border: '1px solid black', margin: '1rem', overflow:"scroll" }}>
                        <div className="proofs">
                            <span>Memo</span>
                            <img src={modalIsOpen.memo} alt="10th memo" style={{ maxWidth: "400px", width: "100%" }} />
                        </div>
                        <div className="proofs">
                            <span>Allotment</span>
                            <img src={modalIsOpen.allotment} alt="allotment" style={{ maxWidth: "400px", width: "100%" }} />
                        </div>
                        <div className="proofs">
                            <span>IdProof</span>
                            <img src={modalIsOpen.proof} alt="id-proof" style={{ maxWidth: "400px", width: "100%" }} />
                        </div>
                    </span>
                </div>

            </Modal>

            <table>
                <caption>ID CARD APPROVAL</caption>
                <thead>
                    <tr>
                        <th>Profile</th>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Blood</th>
                        <th>Reason</th>
                        <th>Docx</th>
                        <th>Control</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((e, index) => {
                        console.log(e);
                        return (
                            <tr key={index}>
                                <td className="user-img"><img src={e.profileImageName} alt="user-image" /></td>
                                <td>{e.studentId}</td>
                                <td>{e.name}</td>
                                <td>{e.mobile}</td>
                                <td>{e.email}</td>
                                <td>{e.blood}</td>
                                <td><input type="text" onChange={v => {
                                    reasonRef.current[e.studentId] = v.target.value
                                }
                                } /></td>
                                <td onClick={() => setIsOpen({ memo: e.memo, proof: e.proof, allotment: e.allotment })} style={{ cursor: "pointer" }}>docx</td>
                                <td className="ar-buttons">
                                    <button className="approve" onClick={disabled ? () => { } : () => approve(e.studentId)} disabled={disabled}>Approve</button>
                                    <button className="reject" onClick={disabled ? () => { } : () => reject(e.studentId)} disabled={disabled}>Reject</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}