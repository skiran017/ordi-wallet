import React from 'react';
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react';

import CustomButton from './CustomButton';

const data = {
  imageURL:
    'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
  name: 'Nature',
  inscriptionNumber: 15997,
  contentType: 'img/text',
  content: 'URL',
  postageValue: 'outputValue', //in sats,
  timeStamp: '',
};

function ListCard() {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        border="2px solid orange"
      >
        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
          height="300px"
          width="300px"
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
              {data.name}
            </Box>

            <CustomButton
              onClick={() => console.log('send')}
              btnType="button"
              title="Send"
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
export default ListCard;
