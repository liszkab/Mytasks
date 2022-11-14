import React, { createContext, useState, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

const initiaVaue = {
  authenticated: false,
  setAuthenticated: () => {},
};
const AuthContext = createContext<IAuthContext>(initiaVaue);
const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(initiaVaue.authenticated);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
