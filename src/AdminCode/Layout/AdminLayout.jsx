import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className='w-full min-h-screen '>
            {/* navbar */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            {/* main content */}
            <div className="w-11/12 mx-auto py-16 md:py-16">
                <Outlet />
            </div>

        </div>
    );
};

export default AdminLayout;