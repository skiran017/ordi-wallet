import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  ComponentPropsWithoutRef,
} from 'react';

interface Context {
  address?: string;
  connected?: boolean;
  accounts?: string[];
  balance?: {
    confirmed?: number;
    unconfirmed?: number;
    total?: number;
  };
}

interface ChildrenProps {
  children: React.ReactNode;
}

const StateContext = createContext<Context>({});
export const StateContextProvider = ({ children }: ChildrenProps) => {
  return (
    <StateContext.Provider
      value={{
        address: '',
        connected: false,
        accounts: [],
        balance: {
          confirmed: 0,
          unconfirmed: 0,
          total: 0,
        },
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
