import React from 'react';
import { useStateContext } from '../context';
import {
  Button,
  Card,
  RadioGroup,
  Radio,
  Box,
  Flex,
  chakra,
} from '@chakra-ui/react';
import ListInscriptions from './ListInscriptions';
import CustomButton from './CustomButton';

function Home() {
  const {
    unisatInstalled,
    connected,
    address,
    balance,
    handleAccountsChanged,
    network,
    setNetwork,
  } = useStateContext();

  if (!unisatInstalled) {
    return (
      <chakra.header>
        <CustomButton
          onClick={() => {
            window.location.href = 'https://unisat.io';
          }}
          title="Install Unisat Wallet"
          type="button"
        />
      </chakra.header>
    );
  }
  const unisat = (window as any).unisat;
  return (
    <Box>
      <chakra.header>
        {connected ? (
          <Flex direction="column" alignItems="center">
            <Card
              size="small"
              title="Basic Info"
              style={{ width: 300, margin: 10 }}
            >
              <div style={{ textAlign: 'left', marginTop: 10 }}>
                <div style={{ fontWeight: 'bold' }}>Address:</div>
                <div style={{ wordWrap: 'break-word' }}>{address}</div>
              </div>

              {/* <div style={{ textAlign: "left", marginTop: 10 }}>
                <div style={{ fontWeight: "bold" }}>PublicKey:</div>
                <div style={{ wordWrap: "break-word" }}>{publicKey}</div>
              </div> */}

              <div style={{ textAlign: 'left', marginTop: 10 }}>
                <div style={{ fontWeight: 'bold' }}>Balance: (Satoshis)</div>
                <div style={{ wordWrap: 'break-word' }}>{balance?.total}</div>
              </div>
            </Card>
            <Card
              size="small"
              title="Switch Network"
              style={{ width: 300, margin: 10 }}
            >
              <div style={{ textAlign: 'left', marginTop: 10 }}>
                <div style={{ fontWeight: 'bold' }}>Network:</div>
                <RadioGroup
                  onChange={async (e: any) => {
                    const network = await unisat.switchNetwork(e.target.value);
                    setNetwork(network);
                  }}
                  value={network}
                >
                  <Radio value={'livenet'}>livenet</Radio>
                  <Radio value={'testnet'}>testnet</Radio>
                </RadioGroup>
              </div>
            </Card>

            {/* <SignPsbtCard />
            <SignMessageCard />
            <PushTxCard />
            <PushPsbtCard />
            <SendBitcoin /> */}
            <ListInscriptions />
          </Flex>
        ) : (
          <Flex h="90vh" justifyContent="center" alignItems="center">
            <CustomButton
              onClick={async () => {
                const result = await unisat.requestAccounts();
                handleAccountsChanged(result);
              }}
              btnType="button"
              title="Connect Unisat Wallet"
            />
          </Flex>
        )}
      </chakra.header>
    </Box>
  );
}

export default Home;
