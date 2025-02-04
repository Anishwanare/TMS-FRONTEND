import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerAdmin } from "../../store/slices/userSlice";

const RegisterAdmins = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [profileImage, setProfileImage] = useState(null);
    const [partyName, setPartyName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !phone || !password) {
            toast.error("Please fill all required fields");
            return;
        }
        if (role === "Admin" && !partyName) {
            toast.error("Party Name is required for Admin");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", firstName);
        formDataToSend.append("middleName", middleName);
        formDataToSend.append("lastName", lastName);
        formDataToSend.append("email", email);
        formDataToSend.append("phone", phone);
        formDataToSend.append("password", password);
        formDataToSend.append("role", role);
        formDataToSend.append("profileImage", profileImage);
        formDataToSend.append("partyName", partyName);

        try {
            await dispatch(registerAdmin(formDataToSend));
            toast.success("Registration successful");
            navigate("/super-admin-dashboard");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex  items-center justify-center bg-gray-200 p-6">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm w-full max-w-4xl border border-gray-100">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Register Admin</h2>
                <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-2 ">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Middle Name (Optional)</label>
                        <input
                            type="text"
                            placeholder="Middle Name"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Profile Image</label>
                        <input
                            type="file"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                        </select>
                    </div>
                    {role === "Admin" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Party Name</label>
                            <input
                                type="text"
                                placeholder="Party Name"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                value={partyName}
                                onChange={(e) => setPartyName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAdmins;