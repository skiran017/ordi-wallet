import React from 'react';
import { useStateContext } from '../context';
import { chakra, Box, Flex, Grid } from '@chakra-ui/react';
import ListCard from './ListCard';

// const result = {
//   list: [
//     {
//       inscriptionNumber: 15997,
//       contentType: 'image/jpeg',
//       content:
//         'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
//       postageValue: 10000, //in sats,
//       timeStamp: 1687920723,
//     },
//     {
//       inscriptionNumber: 15997,
//       contentType: 'image/jpeg',
//       content:
//         'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
//       postageValue: 10000, //in sats,
//       timeStamp: 1687920723,
//     },
//     {
//       inscriptionNumber: 15997,
//       contentType: 'image/jpeg',
//       content:
//         'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
//       postageValue: 10000, //in sats,
//       timeStamp: 1687920723,
//     },
//     {
//       inscriptionNumber: 15997,
//       contentType: 'image/jpeg',
//       content:
//         'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
//       postageValue: 10000, //in sats,
//       timeStamp: 1687920723,
//     },
//     {
//       inscriptionNumber: 15997,
//       contentType: 'image/jpeg',
//       content:
//         'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
//       postageValue: 10000, //in sats,
//       timeStamp: 1687920723,
//     },
//     {
//       inscriptionNumber: 15997,
//       contentType: 'image/jpeg',
//       content:
//         'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
//       postageValue: 10000, //in sats,
//       timeStamp: 1687920723,
//     },
//   ],
//   total: 0,
// };

function ListInscriptions() {
  const [result, setResult] = React.useState({
    list: [],
    total: 0,
  });
  const { unisatInstalled, connected, address } = useStateContext();
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
  }, []);

  return (
    <Box p="8px">
      <chakra.h1
        mb="12px"
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
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {result
          ? result?.list?.map((listItem: any) => (
              <ListCard listItem={listItem} />
            ))
          : null}
      </Grid>
    </Box>
  );
}

export default ListInscriptions;
