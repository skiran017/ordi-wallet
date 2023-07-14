import React from 'react';
import { useStateContext } from '../context';
import { chakra, Box, Flex, Grid } from '@chakra-ui/react';
import ListCard from './ListCard';

import SendAddressModal from './SendAddressModal';

function ListInscriptions() {
  const [result, setResult] = React.useState({
    list: [],
    total: 0,
  });
  const { address, balance } = useStateContext();
  const unisat = (window as any).unisat;
  const getUserInscriptionList = async () => {
    try {
      const data = await unisat.getInscriptions();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (address) {
      getUserInscriptionList();
    }
  }, [address, balance]);

  return (
    <Box p={6}>
      <chakra.h1
        mb="22px"
        fontWeight="semibold"
        fontSize="20px"
        textAlign={{ base: 'center', md: 'left' }}
      >
        Your Total Inscriptions:
        <chakra.span pl="8px">{result && result.total}</chakra.span>
      </chakra.h1>

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gap={6}
      >
        {result
          ? result?.list?.map((listItem: any) => (
              <Flex
                direction="column"
                border="2px solid orange"
                rounded={10}
                key={listItem?.inscriptionId}
              >
                <ListCard listItem={listItem} />
                <SendAddressModal listItem={listItem} />
              </Flex>
            ))
          : null}
      </Grid>
    </Box>
  );
}

export default ListInscriptions;
