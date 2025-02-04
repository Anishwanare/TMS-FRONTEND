import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.User)
    return isAuthenticated ? children : <Navigate to={"signin"} />
}

export default Protected
