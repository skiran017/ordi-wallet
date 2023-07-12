import React from 'react';
import { useStateContext } from '../context';
import { Button, chakra, RadioGroup, Radio, Box } from '@chakra-ui/react';
import ListCard from './ListCard';

function ListInscriptions() {
  const [list, setList] = React.useState({
    listArr: [],
    total: 0,
  });
  const { unisatInstalled, connected, address } = useStateContext();
  const unisat = (window as any).unisat;
  const getUserInscriptionList = async () => {
    const data = await unisat.getInscriptions();
    setList(data);
  };

  React.useEffect(() => {
    if (address) {
      getUserInscriptionList();
    }
  }, []);

  return (
    <Box>
      <chakra.h1>Your Total Inscriptions:{list && list.total}</chakra.h1>
      <ListCard />
    </Box>
  );
}

export default ListInscriptions;
