import { Navigate } from 'react-router-dom'
import IsAuth from './IsAuth'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const PrivateRouting = ({ children }) => {
  const isAuth = IsAuth();

  useEffect(() => {
    if (!isAuth) {
      toast.error("You are not logged in please log in first");
    }
  }, [isAuth]);

  return isAuth ? children : <Navigate to="/login" replace />;
}

export default PrivateRouting
