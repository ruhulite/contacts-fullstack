import {createContext, useContext, useEffect, useState} from "react";

const SessionContext= createContext();

export const useSession = () => useContext(SessionContext);

interface UserLogin {
    username: string;
    password: string;
}

export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserLogin>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storesUser = JSON.parse(sessionStorage.getItem("user"));
        if (storesUser) {
            setUser(storesUser);
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, [])

    const login = (user: UserLogin) => {
        setIsLoggedIn(true);
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    const logout = (data: any) => {
        if (data) {
            setIsLoggedIn(false);
            setUser({
                username: '',
                password: '',
            });
            sessionStorage.removeItem("user");
        }
    }

    return (
        <SessionContext.Provider value={{isLoggedIn, user, loading, login, logout}}>{children}</SessionContext.Provider>
    )
}