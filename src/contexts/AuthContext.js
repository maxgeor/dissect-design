import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: null,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
