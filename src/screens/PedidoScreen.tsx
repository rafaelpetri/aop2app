import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import SuccessMessage from '../components/SuccessMessage';
import { post } from '../services/api';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

const ItemRow = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
`;

const ItemInfo = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 700;
`;

const Price = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 700;
`;

const QtyControls = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const QtyButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
`;

const QtyText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

const Footer = styled.View`
  padding-top: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export default function PedidoScreen() {
  const { items, incrementQty, decrementQty, removeItem, clear, total } = useCart();
  const { user } = useUser();
  const navigation = useNavigation<any>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const isEmpty = items.length === 0;

  useEffect(() => {
    if (!successId) return;
    const t = setTimeout(() => {
      setSuccessId(null);
      // Navega automaticamente para o Cardápio após enviar o pedido
      navigation.navigate('Cardapio');
    }, 3000);
    return () => clearTimeout(t);
  }, [successId]);

  return (
    <Container>
      {isEmpty && !successId && <Text>Seu carrinho está vazio.</Text>}
      {!isEmpty && (
        <FlatList
          data={items}
          keyExtractor={(i) => i.product.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
          renderItem={({ item }) => (
            <ItemRow>
              <ItemInfo>
                <Name>{item.product.name}</Name>
                <Price>{`R$ ${Number(item.product.price).toFixed(2)}`}</Price>
              </ItemInfo>
              <QtyControls>
                <QtyButton onPress={() => decrementQty(item.product.id)}>
                  <QtyText>-</QtyText>
                </QtyButton>
                <QtyText>{item.qty}</QtyText>
                <QtyButton onPress={() => incrementQty(item.product.id)}>
                  <QtyText>+</QtyText>
                </QtyButton>
                <QtyButton onPress={() => removeItem(item.product.id)}>
                  <QtyText>×</QtyText>
                </QtyButton>
              </QtyControls>
            </ItemRow>
          )}
          ListFooterComponent={
            <Footer>
              <Text>{`Total: R$ ${total.toFixed(2)}`}</Text>
              {error && <Text>{error}</Text>}
              <Button title="Limpar carrinho" variant="secondary" onPress={clear} />
              <Button
                title={submitting ? 'Enviando...' : 'Fechar pedido'}
                onPress={async () => {
                  try {
                    setSubmitting(true);
                    setError(null);
                    const payload = {
                      userID: user?.id ?? 'guest',
                      itens: items.map((i) => ({
                        productId: i.product.id,
                        name: i.product.name,
                        unitPrice: Number(i.product.price),
                        qty: i.qty,
                        subtotal: Number(i.product.price) * i.qty,
                      })),
                      total: Number(total.toFixed(2)),
                      createdAt: new Date().toISOString(),
                      status: 'novo',
                    };
                    const created = await post<{ id: string }>('orders', payload);
                    setSuccessId(created.id);
                    clear();
                  } catch (e) {
                    const msg = e instanceof Error ? e.message : 'Falha ao enviar pedido. Tente novamente.';
                    setError(msg);
                  } finally {
                    setSubmitting(false);
                  }
                }}
                disabled={isEmpty || submitting}
              />
            </Footer>
          }
        />
      )}
      {successId && <SuccessMessage text={`Pedido #${successId} enviado!`} />}
    </Container>
  );
}