import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CadastroSuccessScreen from '../screens/CadastroSuccessScreen';
import NovaSenhaScreen from '../screens/NovaSenhaScreen';
import SenhaAlteradaScreen from '../screens/SenhaAlteradaScreen';
import CardapioScreen from '../screens/CardapioScreen';
import PedidoScreen from '../screens/PedidoScreen';
import AcompanharScreen from '../screens/AcompanharScreen';
import PromocoesScreen from '../screens/PromocoesScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={() => <MenuDrawer />}> 
      <Drawer.Screen name="Cardapio" component={CardapioScreen} options={{ header: () => <Header title="Cardápio" /> }} />
      <Drawer.Screen name="Pedido" component={PedidoScreen} options={{ header: () => <Header title="Pedido" /> }} />
      <Drawer.Screen name="Acompanhar" component={AcompanharScreen} options={{ header: () => <Header title="Acompanhar" /> }} />
      <Drawer.Screen name="Promocoes" component={PromocoesScreen} options={{ header: () => <Header title="Promoções" /> }} />
    </Drawer.Navigator>
  );
}

function AuthStack({ onSignedIn }: { onSignedIn: () => void }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} onSignedIn={onSignedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroSuccess" component={CadastroSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NovaSenha" component={NovaSenhaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SenhaAlterada" component={SenhaAlteradaScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const [signedIn, setSignedIn] = useState(false);

  return signedIn ? (
    <AppDrawer />
  ) : (
    <AuthStack onSignedIn={() => setSignedIn(true)} />
  );
}