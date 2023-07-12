import React from 'react';
import { Button } from '@chakra-ui/react';

function CustomButton({ btnType, title, handleClick, ...props }: any) {
  return (
    <Button
      variant="ghost"
      fontWeight={'semibold'}
      fontSize="16px"
      px={4}
      rounded="10px"
      _hover={{
        background: '#ff910026',
      }}
      _active={{
        background: '#ff910026',
        transform: 'scale(0.98)',
      }}
      border="1px solid orange"
      type={btnType}
      onClick={handleClick}
      {...props}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
