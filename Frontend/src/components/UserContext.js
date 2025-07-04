// import React, { createContext, useState, useEffect } from 'react';

// // Create the context
// export const UserContext = createContext();

// // Provider component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // Load user and token from localStorage on initial render
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('token');

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   // Handle login and save user/token to context and localStorage
//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);

//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', authToken);
//   };

//   // Handle logout and clear context/localStorage
//   const logout = () => {
//     setUser(null);
//     setToken(null);

//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <UserContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      // Parse only if data exists
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
