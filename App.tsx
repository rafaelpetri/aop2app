import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import theme from './src/theme';
import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CartProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="dark" />
          </NavigationContainer>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
