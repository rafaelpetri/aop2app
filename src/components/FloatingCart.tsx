import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const Wrapper = styled.View`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg}px;
  bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Fab = styled.TouchableOpacity`
  min-height: 56px;
  min-width: 56px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 700;
`;

const Badge = styled.View`
  min-width: 24px;
  height: 24px;
  padding-horizontal: 6px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 700;
`;

export default function FloatingCart() {
  const navigation = useNavigation();
  const { items } = useCart();

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  if (count === 0) return null;

  return (
    <Wrapper pointerEvents="box-none">
      <Fab activeOpacity={0.85} onPress={() => navigation.navigate('Pedido' as never)}>
        <Label>Carrinho</Label>
        <Badge>
          <BadgeText>{count}</BadgeText>
        </Badge>
      </Fab>
    </Wrapper>
  );
}
