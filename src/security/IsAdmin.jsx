import {react, useState } from "react";
import Api from "../axios/Api";

const IsAdmin = async () => {
    const [Admin, setAdmin] = useState(false)
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const response = await Api.get('/user/profile', {
                headers: {
                    'Authorization': token,
                },
            });
            setAdmin(response.data.user.isAdmin);
            console.log(Admin)
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }finally{
            return Admin
        }
    }
}
export default IsAdmin
