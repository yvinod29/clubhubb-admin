import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { INITIAL_CLUB, IContextType } from "./AuthContext";
import { useVerifyclubMutation } from "@/store/api/authApi";
import { IClub } from "@/types";


interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [club, setClub] = useState<IClub>(INITIAL_CLUB);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Use the useVerifyClubMutation hook
    const [verifyclub, {  isError}] = useVerifyclubMutation();
    console.log("verifyclub")
 
    const checkAuthClub = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
 

            if (!token) {
                throw new Error("Token not found");
            }

            // Use the verifyuserMutation function instead of the query
            const club=await verifyclub({ token });
             if (isError) {
                navigate("/sign-up");
                return false;
            }
            if('data' in club){
            setIsAuthenticated(true);
            const { user } = club.data;
            console.log(user)
            // dispatch(setClub({ clubId , clubName , clubUsername}));

            setClub({
                clubId: user._id,
                clubName: user.clubName,
                clubUsername: user.clubUsername,
                clubEmail: user.clubEmail,
                clubTitle: user.clubTitle,
                description: user.description,
                phoneNumber: user.phoneNumber,
            });
              
            return true;
        }
        return false;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            navigate("/sign-up");
 
        } else {
            checkAuthClub();
         }
    }, []);
    const value: IContextType = {
        club,
        setClub,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthClub,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
