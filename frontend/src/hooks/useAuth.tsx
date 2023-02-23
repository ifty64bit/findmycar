import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function useAuth() {
    const [isLoggedin, setIsLoggedin] = useState<boolean | null>(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token) as any;
            const currentTime = Date.now() / 1000;
            // check if the token is expired
            if (decoded.exp < currentTime) {
                localStorage.removeItem("token"); // remove expired token from localStorage
                setIsLoggedin(false);
            } else {
                setIsLoggedin(true);
            }
        } else {
            setIsLoggedin(false);
        }
    }, []);

    return isLoggedin;
}

export default useAuth;
