import React, { useState } from 'react'
import DashboardHeader from '../layout/DashboardHeader'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
    const {user } = useSelector((state)=>state.User) 
    return (
        <div className='md:pl-[320px]'>
            <DashboardHeader/>
        </div>
    )
}

export default AdminDashboard


