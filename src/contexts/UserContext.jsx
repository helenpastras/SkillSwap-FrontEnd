import { createContext, useState } from 'react';

const UserContext = createContext();

const getToken = () => localStorage.getItem('token');

const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());
  const token = getToken();

  const value = { user, setUser, token };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };