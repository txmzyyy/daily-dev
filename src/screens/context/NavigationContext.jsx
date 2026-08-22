import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children, initialView = 'home' }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [params, setParams] = useState({});
  const [history, setHistory] = useState([initialView]);

  // Navigate to a new view with optional params
  const navigate = (view, newParams = {}) => {
    setParams(newParams);
    setCurrentView(view);
    setHistory((prev) => [...prev, view]);
  };

  // Go back to the previous view in history
  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current view
      const previousView = newHistory[newHistory.length - 1];
      
      setHistory(newHistory);
      setCurrentView(previousView);
    }
  };

  const value = {
    currentView,
    params,
    navigate,
    goBack,
    canGoBack: history.length > 1
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};