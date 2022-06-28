import jwt_decode from "jwt-decode";


export const getNV = (history) => {
    let data = JSON.parse(localStorage.getItem("employee"))
    if (data != null) {
        let decodedToken = jwt_decode(data.token)
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            history.push("/login")
            localStorage.removeItem('employee')
        } else {
            return data
        }
    }
    return null
}

export const getTokenEmployee = () => {
    let employee = localStorage.getItem("employee")
    if (employee === null) return null
    return JSON.parse(employee).token
}