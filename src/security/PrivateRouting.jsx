import { Navigate } from 'react-router-dom'
import IsAuth from './IsAuth'

const PrivateRouting = ({ children }) => {
  return (
    IsAuth() ? children : <>{alert("You are not loged in please log in first")}<Navigate to="/login" replace /></>
  )
}

export default PrivateRouting
