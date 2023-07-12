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
  CardBody,
  CardHeader,
  Text,
  Divider,
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

  const handleNetworkChange = async (e: string) => {
    try {
      const network = await unisat.switchNetwork(e);
      setNetwork(network);
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ network });

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
          <Box p={2}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              maxH="260px"
            >
              <Text
                textAlign="center"
                w="full"
                fontWeight="bold"
                fontSize="36px"
              >
                View and Send your Ordinal Inscriptions
              </Text>
              <Card size="small" w="250px">
                <CardBody>
                  <Box textAlign="left" p={'10px'}>
                    <Box fontWeight="bold">Network:</Box>
                    <RadioGroup onChange={handleNetworkChange} value={network}>
                      <Radio p={2} value={'livenet'}>
                        livenet
                      </Radio>
                      <Radio p={2} value={'testnet'}>
                        testnet
                      </Radio>
                    </RadioGroup>
                  </Box>
                  <Flex flexWrap="wrap" textAlign="left" p={'10px'}>
                    <Box fontWeight="bold">Balance:</Box>
                    <chakra.p p="0 6px" fontWeight="semibold">
                      {balance?.total} sats
                    </chakra.p>
                  </Flex>
                </CardBody>
              </Card>

              {/* <SignPsbtCard />
            <SignMessageCard />
            <PushTxCard />
            <PushPsbtCard />
            <SendBitcoin /> */}
            </Flex>
            <Divider />
            <ListInscriptions />
          </Box>
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
