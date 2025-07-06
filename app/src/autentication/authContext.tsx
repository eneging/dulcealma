import { error } from "console";
import React, {createContext, useContext, useState,  } from "react";
import type { ReactNode } from "react";

type AuthContextType = {

    isAdmin: boolean;
    login: () => void;
    logout: () => void;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => setIsAdmin(true);
  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) throw new Error("useAuth must be used within AouthProvider");
return context;

};