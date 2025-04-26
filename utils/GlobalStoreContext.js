import React, { createContext, useContext, useRef } from 'react';

const GlobalStoreContext = createContext(null);

export const GlobalStoreProvider = ({ children }) => {
  const storeRef = useRef({
    address: '',
  });

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = () => useContext(GlobalStoreContext);
