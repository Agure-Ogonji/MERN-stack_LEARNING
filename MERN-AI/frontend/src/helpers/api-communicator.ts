import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("UNABLE TO LOGIN");
    }
    const data = await res.data;
    return data;
};

export const signUpUser = async (
    name: string,
    email: string,
    password: string
) => {
    const res = await axios.post("/user/singup", {name, email, password});
    if (res.status !== 201) {
        throw new Error("UNBALE TO SIGNUP");
    }
    const data = await res.data;
    return data;
};
export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("UNABLE TO AUTHENTICATE");
    }
    const data = await res.data;
    return data;
};
export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", {message});
    if (res.status !== 200) {
        throw new Error("UNABLE TO SEND A CHAT");
    }
    const data = await res.data;
    return data;
};

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
        throw new Error("UNABLE TO SEND A CHAT");
    }
    const data = await res.data;
    return data;
};

export const deleteUserChats = async () => {
    const res = await axios.get("/chat/delete");
    if (res.status !== 200) {
        throw new Error("UNABLE TO DELETE CHATS");
    }
    const data = await res.data;
    return data;
};

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
        throw new Error("UNABLE TO LOGOUT");
    }
    const data = await res.data;
    return data;
}
