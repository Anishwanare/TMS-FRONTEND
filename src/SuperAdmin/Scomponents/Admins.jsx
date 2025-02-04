import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminAccountStatus } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";

const Admins = () => {
    const dispatch = useDispatch();
    const { admins, loading } = useSelector((state) => state.User);

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Management</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {admins && admins.map((admin) => (
                    <div key={admin._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-300">
                        {/* Admin Profile Section */}
                        <div className="flex items-center space-x-4 border-b pb-4">
                            <Link to={`/admin-profile-page/${admin._id}`}>
                                <img
                                    src={admin.profileImage?.url || "/default-avatar.png"}
                                    alt={admin.firstName}
                                    className="w-14 h-14 rounded-full border-2 border-purple-400"
                                />
                            </Link>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{admin.firstName} {admin.lastName}</h3>
                                <p className="text-gray-600 text-sm">{admin.email}</p>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${admin.role === "Admin" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-700"}`}>
                                    {admin.role}
                                </span>
                            </div>
                        </div>

                        {/* Admin Status & Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${admin.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                {admin.isActive ? "Active" : "Inactive"}
                            </span>
                            <select
                                onChange={(e) => dispatch(adminAccountStatus(admin._id, e.target.value))}
                                value={admin.isActive ? "Yes" : "No"}
                                className="border border-gray-300 bg-white text-gray-800 text-sm px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-400 transition"
                            >
                                <option value="Yes">Active</option>
                                <option value="No">Inactive</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admins;
