import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { get } from '../services/api';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

const Empty = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const ItemCard = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
`;

const Thumb = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
  background-color: #f7f7f7;
`;

const ThumbFallback = styled.View`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
  background-color: #eee;
`;

const Info = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 700;
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const Price = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 700;
`;

export default function PromocoesScreen() {
  type Promo = { id: string; title: string; description: string; price: number; imageUrl?: string; active?: boolean };
  const [items, setItems] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  const isValidImageUrl = (u?: string) => !!u && /^https?:\/\//i.test(u);

  useEffect(() => {
    (async () => {
      try {
        const data = await get<Promo[]>('promocoes');
        setItems(data);
        setError(null);
      } catch (e) {
        setError('Erro ao carregar promoções.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container>
      {loading && <Text>Carregando...</Text>}
      {!loading && error && (
        <Empty>
          <Text>{error}</Text>
        </Empty>
      )}
      {!loading && !error && items.length === 0 && (
        <Empty>
          <Text>Nenhuma promoção encontrada.</Text>
        </Empty>
      )}
      {!loading && !error && items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
          renderItem={({ item }) => (
            <ItemCard>
              {isValidImageUrl(item.imageUrl) ? (
                <Thumb source={{ uri: item.imageUrl }} />
              ) : (
                <ThumbFallback />
              )}
              <Info>
                <Title>{item.title}</Title>
                <Description numberOfLines={2}>{item.description}</Description>
              </Info>
              <Price>{`R$ ${Number(item.price).toFixed(2)}`}</Price>
              <Button
                title={item.active === false ? 'Indisponível' : 'Adicionar'}
                onPress={() =>
                  addItem({ id: `promo:${item.id}`, name: item.title, price: Number(item.price), imageUrl: item.imageUrl })
                }
                disabled={item.active === false}
              />
            </ItemCard>
          )}
        />
      )}
    </Container>
  );
}