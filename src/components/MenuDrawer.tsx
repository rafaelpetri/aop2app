import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text`
  margin-left: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md}px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export default function MenuDrawer() {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <DrawerContentScrollView>
      <SafeAreaView edges={["top"]}>
        <Container>
          <Item onPress={() => navigation.navigate('Cardapio' as never)}>
            <MaterialCommunityIcons name="food" size={22} color={theme.colors.text} />
            <Label>Cardápio</Label>
          </Item>
          <Divider />
          <Item onPress={() => navigation.navigate('Pedido' as never)}>
            <Ionicons name="receipt-outline" size={22} color={theme.colors.text} />
            <Label>Pedido</Label>
          </Item>
          <Divider />
          <Item onPress={() => navigation.navigate('Acompanhar' as never)}>
            <Ionicons name="map" size={22} color={theme.colors.text} />
            <Label>Acompanhar</Label>
          </Item>
          <Divider />
          <Item onPress={() => navigation.navigate('Promocoes' as never)}>
            <Ionicons name="pricetag-outline" size={22} color={theme.colors.text} />
            <Label>Promoções</Label>
          </Item>
        </Container>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}