import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile, updateAdminProfile } from "../../store/slices/userSlice";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import toast from "react-hot-toast";

const AdminProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { adminProfile, loading, error } = useSelector((state) => state.User);

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [partyName, setPartyName] = useState("");
    const [subscriptionModel, setSubscriptionModel] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchAdminProfile(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (adminProfile) {
            setFirstName(adminProfile.firstName || "");
            setMiddleName(adminProfile.middleName || "");
            setLastName(adminProfile.lastName || "");
            setEmail(adminProfile.email || "");
            setPhone(adminProfile.phone || "");
            setAddress(adminProfile.address || "");
            setPartyName(adminProfile.partyName || "");
            setSubscriptionModel(adminProfile.subscriptionModel || "Monthly");
            setIsVerified(adminProfile.isVerified || false);
        }
    }, [adminProfile]);

    const handleUpdateAdminProfile = () => {

        const isTrue = window.confirm("Are you sure you want to update ")
        if (!isTrue) {
            setEditMode(false);
            return
        }
        if (!id) {
            console.error("Admin ID is missing!");
            toast.error("Admin ID is missing!");
            return;
        }

        const formData = {
            firstName, middleName, lastName, email, phone, address, partyName, subscriptionModel, isVerified
        };

        if (subscriptionModel && !["Monthly", "Yearly", "Quarterly"].includes(subscriptionModel)) {
            return toast.error("Invalid subscription tyoe!")
        }

        dispatch(updateAdminProfile(formData, id));
        setEditMode(false);
    };

    if (loading) return <p className="text-center text-lg font-medium">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Admin Profile</h2>
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-300">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b pb-4">
                    <div className="relative">
                        <img
                            src={adminProfile.profileImage?.url}
                            alt={adminProfile.firstName}
                            className={`w-24 h-24 rounded-full border-4 border-green-500 ${adminProfile.isVerified === false && 'border-red-500'}`}
                        />

                        {/* Verification Icon */}
                        {adminProfile.isVerified && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                title="Verified Admin"
                                className="absolute top-0 right-0 text-blue-500 w-6 h-6 bg-white rounded-full p-1 border border-blue-400"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>

                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl font-semibold text-gray-900">
                            {adminProfile.firstName} {adminProfile.middleName} {adminProfile.lastName}
                        </h3>
                        <p className="text-gray-600">{adminProfile.email}</p>
                        <p className="text-gray-600">{adminProfile.phone}</p>

                        {/* Role */}
                        <span className={`text-sm font-semibold px-3 py-1 rounded-md ${adminProfile.role === "Admin" ? "bg-blue-200 text-blue-700" : "bg-gray-300 text-gray-800"}`}>
                            {adminProfile.role}
                        </span>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="mt-4 space-y-3">
                    <p className="text-gray-700"><strong>Status:</strong> {adminProfile.isActive ? "Active" : "Inactive"}</p>
                    <p className="text-gray-700"><strong>Verified:</strong> {adminProfile.isVerified ? "Yes" : "No"}</p>
                    <p className="text-gray-700"><strong>Party Name:</strong> {adminProfile.partyName || "NA"}</p>
                    <p className="text-gray-700"><strong>Subscription Model:</strong> {adminProfile.subscriptionModel}</p>
                </div>

                {/* Edit Button */}
                <button
                    onClick={() => setEditMode(true)}
                    className="mt-6 w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                >
                    Edit Profile
                </button>
            </div>

            {/* Edit Profile Form */}
            {editMode && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="fixed md:bottom-10 w-full bg-white shadow-2xl p-6 border-t rounded-t-lg max-w-3xl mx-5"
                >
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Update {adminProfile.firstName + adminProfile.lastName}</h3>

                    {/* Form Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md: md:gap-4">
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="First Name" />
                        <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Middle Name" />
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Last Name" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Email" />
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Phone" />
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Address" />
                        <input type="text" value={partyName} onChange={(e) => setPartyName(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Party Name" />

                        <select value={subscriptionModel} onChange={(e) => setSubscriptionModel(e.target.value)} className="p-1 md:p-3 border rounded-md focus:ring-2 focus:ring-indigo-500">
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                            <option value="Quarterly">Quarterly</option>
                        </select>

                        <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} />
                            <span className="text-gray-700">Verified</span>
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer">Cancel</button>
                        <button onClick={handleUpdateAdminProfile} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">Update Profile</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AdminProfile;
