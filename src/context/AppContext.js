'use strict';

'use client';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [variables, setVariables] = useState({
    userName: '',
    isLoggedIn: false,
    preferences: {},
    // Add more variables as needed
  });

  const updateVariables = (newVariables) => {
    setVariables(prev => ({
      ...prev,
      ...newVariables
    }));
  };

  return (
    <AppContext.Provider value={{ variables, updateVariables }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 