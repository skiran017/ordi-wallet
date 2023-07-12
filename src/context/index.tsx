import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useRef,
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
  unisatInstalled?: boolean;
  handleAccountsChanged?: any;
  network?: string;
  setNetwork?: any;
}

interface ChildrenProps {
  children: React.ReactNode;
}

const StateContext = createContext<Context>({});
export const StateContextProvider = ({ children }: ChildrenProps) => {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState('livenet');

  const getAccountInfo = async () => {
    const unisat = (window as any).unisat;
    const [address] = await unisat.getAccounts();
    setAddress(address);

    const publicKey = await unisat.getPublicKey();
    setPublicKey(publicKey);

    const balance = await unisat.getBalance();
    setBalance(balance);

    const network = await unisat.getNetwork();
    setNetwork(network);
  };

  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  });
  const self = selfRef.current;
  const handleAccountsChanged = (_accounts: string[]) => {
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);

      setAddress(_accounts[0]);

      getAccountInfo();
    } else {
      setConnected(false);
    }
  };

  const handleNetworkChanged = (network: string) => {
    setNetwork(network);
    getAccountInfo();
  };

  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = (window as any).unisat;
      }

      if (unisat) {
        setUnisatInstalled(true);
      } else if (!unisat) return;

      unisat.getAccounts().then((accounts: string[]) => {
        handleAccountsChanged(accounts);
      });

      unisat.on('accountsChanged', handleAccountsChanged);
      unisat.on('networkChanged', handleNetworkChanged);

      return () => {
        unisat.removeListener('accountsChanged', handleAccountsChanged);
        unisat.removeListener('networkChanged', handleNetworkChanged);
      };
    }

    checkUnisat().then();
  }, []);

  return (
    <StateContext.Provider
      value={{
        unisatInstalled,
        address,
        connected,
        accounts,
        balance,
        handleAccountsChanged,
        network,
        setNetwork,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
