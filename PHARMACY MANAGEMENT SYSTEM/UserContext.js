// src/UserContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, isRegistered, setIsRegistered }}>
      {children}
    </UserContext.Provider>
  );
};
