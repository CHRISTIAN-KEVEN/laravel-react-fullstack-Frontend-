import { createContext, useContext, useState } from "react";

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const AuthContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    formErrors: {}
});

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem(ACCESS_TOKEN));
    const [formErrors, setFormErrors] = useState({});

    const setToken = (token) => {
        _setToken(token);
        token ? localStorage.setItem(ACCESS_TOKEN, token) : localStorage.removeItem(ACCESS_TOKEN);
    }

    return <AuthContext.Provider value={{
        user,
        token,
        setUser,
        setToken,
        formErrors,
        setFormErrors
    }}>{children}</AuthContext.Provider>
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;