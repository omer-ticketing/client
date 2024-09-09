'use client'

import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export function AppProvider({ children, initialTickets, currentUser }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [user, setUser] = useState(currentUser);

  const clearState = () => {
	setTickets([]);
	setUser(null);
  }

  return (
    <AppContext.Provider value={{ tickets, setTickets, user, setUser, clearState }}>
      {children}
    </AppContext.Provider>
  );
}