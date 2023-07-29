import React, { createContext, useContext } from "react";
import AccountManager from "./accountmanager";

const AccountManagerContext = createContext();

export function useAccountManager() {
  return useContext(AccountManagerContext);
}

export function AccountManagerProvider({ children }) {
  const accountManagerInstance = AccountManager.getInstance();

  return (
    <AccountManagerContext.Provider value={accountManagerInstance}>
      {children}
    </AccountManagerContext.Provider>
  );
}
