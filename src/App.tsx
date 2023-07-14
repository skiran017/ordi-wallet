import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import Navbar from './components/Navbar';
import Home from './components/Home';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Home />
  </ChakraProvider>
);
