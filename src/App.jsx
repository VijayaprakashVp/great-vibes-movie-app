import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Routes, Route } from 'react-router-dom';
import Movies from './Components/Movies';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher ml="95%" />
      <Routes>
        <Route path="/" element={<Movies />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
