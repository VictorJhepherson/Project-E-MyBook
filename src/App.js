import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './src/contexts/UserContext';

import Routes from './src/stacks/router';

export default function MyBook() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </UserContextProvider>
  );
}