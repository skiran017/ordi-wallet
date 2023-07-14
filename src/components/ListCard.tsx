import React from 'react';
import { Flex, Box, Image, useColorModeValue } from '@chakra-ui/react';

interface ListCardInt {
  listItem: {
    inscriptionNumber: number;
    contentType: string;
    content: string;
    postageValue: number; //in sats,
    timeStamp: number;
  };
}

function ListCard({ listItem }: ListCardInt) {
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      key={listItem.inscriptionNumber}
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        roundedTop="lg"
        shadow="lg"
        position="relative"
        width="300px"
      >
        <Image
          src={
            listItem.content ||
            'https://spoiltpig.co.uk/wp-content/plugins/responsive-menu/v4.0.0/assets/images/no-preview.jpeg'
          }
          alt={`Picture of ${listItem.inscriptionNumber}`}
          roundedTop="lg"
          height="300px"
          width="250px"
        />

        <Box p="4">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {listItem.inscriptionNumber}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
export default ListCard;
