
const url = "http://localhost:5000/"


export const approveStudent = async (data) => {
    const response = await fetch(`${url}approve/${data}`)
    const dataResponse = await response.json()
    return dataResponse
}


export const getStudent = async (studentId) => {
    const response = await fetch(`${url}idcard/${studentId}`)
    const dataResponse = await response.json()
    return dataResponse
}


export const rejectStudent = async (studentId, reason) => {
    const response = await fetch(`${url}reject/${studentId}?reason=${reason}`)
    const dataResponse = await response.json()
    return dataResponse
}

// make post request to the server (${url}login) send the json data
export const adminLogin = async (data) => {
    // send post json data to the server
    try {

        const resp = await fetch(`${url}login`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        // check if the status is 200
        if (resp.status === 422) {
            return { "redirect": true }
        }
        // get the access token from the json response
        const jsonData = await resp.json()
        console.log(jsonData);
        const accessToken = jsonData.access_token
        console.log(accessToken);
        localStorage.setItem('accessToken', accessToken)
        // store the access token in the local storage
        return { token: accessToken, status: resp.status }

    } catch (err) {
        return { "redirect": true }
    }


}


// get data from /dashboard route
export const getDashboardData = async () => {
    // get the access token from the local storage
    const accessToken = localStorage.getItem('accessToken')

    // send get request to the server (${url}dashboard) with the access token
    const resp = await fetch(`${url}dashboard`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })

    // check if the status is 200
    if (resp.status !== 200) {
        throw new Error('Failed to get dashboard data')
    }

    // get the json data from the response
    const jsonData = await resp.json()

    // return the json data
    return jsonData
}


// post user data to /student  route
export const addStudent = async (data) => {

    // create a new form data object
    const formData = new FormData()
    // add name, id , blood_group, mobile, profile-image from the data object to the form data object
    formData.append('name', data.name)
    formData.append('id', data.id)
    formData.append('blood_group', data.blood_group)
    formData.append('mobile', data.mobile)
    formData.append('email', data.email)

    // add profile-image file object to the form data object
    // get the filetype from the file object
    const fileType = data.profile_image.type
    // "10_memo": "",
    // "allotment_order": "",
    // "id_proof": ""
    const memoType = data["10_memo"].type
    const allotType = data["allotment_order"].type
    const idType = data["id_proof"].type

    // create a new file name with the file type
    // if file type is image/jpeg then create a new file name with .jpeg
    // if file type is image/png then create a new file name with .png
    const fileName = fileType === 'image/jpeg' ? `${data.name}.jpeg` : `${data.name}.png`
    const memoFilename = fileType === 'image/jpeg' ? `${data.name}.jpeg` : `${data.name}.png`
    const allotFilename = fileType === 'image/jpeg' ? `${data.name}.jpeg` : `${data.name}.png`
    const idFilename = fileType === 'image/jpeg' ? `${data.name}.jpeg` : `${data.name}.png`

    formData.append('profile-image', data.profile_image, fileName)
    formData.append('10-memo', data['10_memo'], memoFilename)
    formData.append('allotment-order', data["allotment_order"], allotFilename)
    formData.append('id-proof', data["id_proof"], idFilename)


    // send post request to the server (${url}student) with the form data object
    const resp = await fetch(`${url}student`, { method: 'POST', body: formData })


    const jsonData = await resp.json()
    const msg = jsonData.msg

    return { msg, status: resp.status }
}




// get accessToken is in the local storage
export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}