import React, { useEffect } from 'react';
import DashboardHeader from '../layout/DashboardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { adminAccountStatus, fetchAdmins } from '../store/slices/userSlice';
import Admins from './Scomponents/Admins';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.User);

    console.log('Login User:', user);


    useEffect(() => {
        dispatch(fetchAdmins());
    }, [dispatch]);

    return (
        <div className='min-h-screen bg-gray-100 lg:pl-[320px]'>
            <DashboardHeader />
            <Admins />
            
        </div>
    );
};

export default SuperAdminDashboard;
