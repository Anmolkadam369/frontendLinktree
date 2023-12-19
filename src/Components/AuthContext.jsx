import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ token: null, userId: null });

  const saveAuthData = ({ token, userId }) => {
    console.log("from AuthContext", token, userId);
    setAuthData({ token, userId });
  };

  return (
    <AuthContext.Provider value={{ authData, saveAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
