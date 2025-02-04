import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        admins: [],
        adminProfile: {},
        loading: false,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.adminProfile = action.payload
            state.error = null;
        },
        updateProfileFailed(state) {
            state.loading = false;
            state.error = null;
        },
        logoutRequest(state) {
            state.loading = true;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = state.error;
        },
        logoutSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.admins = [];
            state.error = null;
        },
        logoutFailed() {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.admins = [];
            state.error = null;
        },
        adminActivestatusRequest(state) {
            state.loading = true;
        },
        adminActivestatusSuccess(state, action) {
            state.loading = false;
        },
        adminActivestatusFailed(state, action) {
            state.loading = false

        },
        loginRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = state.error;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = state.user;
            state.error = action.payload;
        },
        fetchUserRequest(state) {
            state.login = true;
            state.isAuthenticated = false;
            state.user = {};
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        fetchUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        fetchAdminsRequest(state) {
            state.loading = true
        },
        fetchAdminsSuccess(state, action) {
            state.loading = false;
            state.admins = action.payload;
        },
        fetchAdminsFailed(state, action) {
            state.loading = false;
            state.admins = [];
            state.error = action.payload;
        },
        fetchAdminProfileRequest(state) {
            state.loading = true;
            state.adminProfile = {};
        },
        fetchAdminProfileSuccess(state, action) {
            state.loading = false;
            state.adminProfile = action.payload;
            state.error = null;
        },
        fetchAdminProfileFailed(state, action) {
            state.loading = false;
            state.adminProfile = {};
            state.error = action.payload;
        },
        registerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.user = action.payload
            state.error = null;
        },
        registerFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const login = (formData) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/login`,
            formData,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );

        dispatch(userSlice.actions.loginSuccess(data.user));
        if (data.success) {
            toast.success(data.message);
        }
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response?.data?.message));
        console.error("Login Error:", error);
        toast.error(error.response?.data?.message);
    }
};

export const fetchProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/profile`,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(userSlice.actions.fetchUserSuccess(data.user));
        if (data.success) {
            toast.success(data.message);
        }
    } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed(error.response?.data?.message));
        console.error("Fetch User Error:", error);
        toast.error(error.response?.data?.message);
    }
};

export const fetchAdmins = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchAdminsRequest());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/fetch/admins`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        dispatch(userSlice.actions.fetchAdminsSuccess(data.admins));
        if (data.success) {
            toast.success(data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
        dispatch(userSlice.actions.fetchAdminsFailed(error.response?.data?.message));
    }
};

export const adminAccountStatus = (adminId, status) => async (dispatch) => {
    dispatch(userSlice.actions.adminActivestatusRequest());

    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/admin-inactive-active`,
            { adminId, status },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );

        dispatch(userSlice.actions.adminActivestatusSuccess());

        if (data.success) {
            toast.success(data.message);
            dispatch(fetchAdmins());
        }
    } catch (error) {
        dispatch(userSlice.actions.adminActivestatusFailed());
        console.error("Activate Admin Status Error:", error.message);
        toast.error(error.response?.data?.message);
    }
};


export const logout = () => async (dispatch) => {
    dispatch(userSlice.actions.logoutRequest());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/logout`,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(userSlice.actions.logoutSuccess());
        if (data.success) {
            toast.success(data.message);
        }
    }
    catch (error) {
        dispatch(userSlice.actions.logoutFailed());
        console.error("Logout Error:", error.message);
        toast.error(error.response?.data?.message);
    }
}

// admin profile page

export const fetchAdminProfile = (adminId) => async (dispatch) => {
    dispatch(userSlice.actions.fetchAdminProfileRequest());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/admin-profile-page/${adminId}`,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(userSlice.actions.fetchAdminProfileSuccess(data.admin));
        if (data.success) {
            toast.success(data.message);
        }
    } catch (error) {
        dispatch(userSlice.actions.fetchAdminProfileFailed(error.response?.data?.message));
        console.error("Fetch Admin Error:", error);
        toast.error(error.response?.data?.message);
    }
};


export const registerAdmin = (formData) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/register`,
            formData,
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );
        dispatch(userSlice.actions.registerSuccess());
        if (data.success) {
            toast.success(data.message);
        }
    } catch (error) {
        dispatch(userSlice.actions.registerFailed(error.response?.data?.message));
        console.error("Register Admin Error:", error);
        toast.error(error.response?.data?.message);
    }
};

export const updateAdminProfile = (formData, adminId) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/update-admin-profile/${adminId}`,
            formData,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(userSlice.actions.updateProfileSuccess(data.updatedAdmin));
        dispatch(fetchAdminProfile(adminId))
        if (data.success) {
            toast.success(data.message);
        }
    } catch (error) {
        dispatch(userSlice.actions.updateProfileFailed(error.response?.data?.message));
        console.error("Update Admin Profile Error:", error);
        toast.error(error.response?.data?.message);
    }
}



export default userSlice.reducer;
