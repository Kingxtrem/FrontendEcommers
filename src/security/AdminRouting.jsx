
import { Navigate } from 'react-router-dom'
import IsAdmin from './IsAdmin'
import { useEffect, useState } from 'react'
import Api from '../axios/Api'

const AdminRouting = ({ children }) => {
    const [Admin, setAdmin] = useState(true)
    const IsAdmin = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const response = await Api.get('/user/profile', {
                    headers: {
                        'Authorization': token,
                    },
                });
                setAdmin(response.data.user.isAdmin);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            } finally {
                return Admin
            }
        }
        else
        {
            setAdmin(false)
        }
    }
    useEffect(() => {
        IsAdmin()
    }, [children])
    return (
        Admin ? children : <>{alert("You are not Authorized")}<Navigate to="/profile" replace /></>
    )
}

export default AdminRouting