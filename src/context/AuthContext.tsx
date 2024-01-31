import { createContext } from "react";
import { IClub } from "@/types";

export interface IContextType {
  club: IClub;
  setClub: React.Dispatch<React.SetStateAction<IClub>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthClub: () => Promise<boolean>;
}

export  const INITIAL_CLUB  = {
  clubId: "",
  clubName: "",
  clubUsername: "",
   clubEmail: "",
   clubTitle:"",
   description: "",
   phoneNumber:"",

   
 };

export const INITIAL_STATE: IContextType = {
  club: INITIAL_CLUB,
  setClub: () => {},
  isLoading: false,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuthClub: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default AuthContext;
