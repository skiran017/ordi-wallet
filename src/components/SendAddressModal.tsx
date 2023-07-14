import React, { useState } from 'react';
import {
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import CustomButton from './CustomButton';
import { isValidBTCAddress } from '../utils/helpers';

function SendAddressModal({ listItem }: any) {
  const [value, setValue] = useState('');
  const [validAddress, setValidAddress] = useState<boolean>();
  const unisat = (window as any).unisat;

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    let valid = false;
    if (evt.target.value.length) {
      valid = isValidBTCAddress(evt.target.value);
      setValidAddress(valid);
      setValue(evt.target.value);
    } else {
      setValue('');
      setValidAddress(undefined);
    }
  }

  function handleClose() {
    onClose();
    setValue('');
    setValidAddress(undefined);
  }

  async function handleSend() {
    if (listItem) {
      try {
        const tx = await unisat.sendInscription(
          value,
          listItem.inscriptionId
          // {feeRate:15} optional
        );
        console.log({ tx });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <CustomButton
        onClick={onOpen}
        btnType="button"
        title="Send"
        roundedTop={0}
      />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter bitcoin address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {validAddress === false && (
              <chakra.p color="red" fontSize="14px" mb={3}>
                Please enter a valid BTC address.
              </chakra.p>
            )}
            <Input
              _focusVisible={{
                border: value
                  ? validAddress
                    ? '1px solid green'
                    : '1px solid red'
                  : '2px solid orange',
              }}
              value={value}
              onChange={handleInputChange}
            />
          </ModalBody>

          <ModalFooter>
            <CustomButton
              isDisabled={!validAddress}
              onClick={handleSend}
              title="Send"
              w="35%"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SendAddressModal;
