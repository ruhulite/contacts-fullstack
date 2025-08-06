import api from "./api";
interface Register {
    userName: string;
    password: string;
}

export const register = async (userName: string, password: string): Promise<Register> => {
    return await api.post("/register", {
        userName,
        password
    })
}

export const loginUser = async (userName: string, password: string): Promise<Register> => {
    return await api.post("/login", {
        userName,
        password
    }, {
        withCredentials: true
    })
}

export const authStatus = async (): Promise<boolean> => {
    return await api.get("/status", {
        withCredentials: true
    })
}

export const logoutUser = async (): Promise<boolean> => {
    return await api.post("/logout", {}, {
        withCredentials: true
    })
}

export const setup2FA = async (): Promise<boolean> => {
    return await api.post("/2fa/setup", {}, {
        withCredentials: true
    })
}

export const verify2FA = async (token: string): Promise<boolean> => {
    return await api.post("/2fa/verify", {
        token,
    }, {
        withCredentials: true
    })
}

export const reset2FA = async (): Promise<boolean> => {
    return await api.post("/2fa/reset", {}, {
        withCredentials: true
    })
}

