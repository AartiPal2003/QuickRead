// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
  

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     const storedToken = localStorage.getItem('token');
  
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//       setPoints(Number(storedPoints) || 0);
//     }
//   }, []);

//   const login = (userData, authToken) => {
    
//     setUser(userData);
//     setToken(authToken);
//     setPoints(0);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', authToken);
   
    
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     setPoints(0);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
   
//   };

 
//   return (
//     <UserContext.Provider value={{ user, token, login, logout, addPoints }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
