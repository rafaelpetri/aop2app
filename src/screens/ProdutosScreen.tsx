import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, FlatList } from 'react-native';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { get } from '../services/api';

type Props = {
  route?: { params?: { category?: string } };
};

type Produto = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  available?: boolean;
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
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

const Actions = styled.View`
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xs}px;
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

const Status = styled.Text`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export default function ProdutosScreen({ route }: Props) {
  const category = route?.params?.category ?? '';
  const [items, setItems] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items: cartItems, addItem, incrementQty, decrementQty } = useCart();

  const isValidImageUrl = (u?: string) => !!u && /^https?:\/\//i.test(u);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        let data: Produto[] = [];
        // Tenta filtrar pelo servidor; se falhar, busca tudo e filtra localmente
        try {
          data = await get<Produto[]>('produtos', category ? { category } : undefined);
        } catch {
          const all = await get<Produto[]>('produtos');
          data = category ? all.filter((p) => p.category === category) : all;
        }
        setItems(data);
      } catch (e) {
        setError('Erro ao carregar produtos.');
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const AnimatedCard = ({ index, children }: { index: number; children: React.ReactNode }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(8)).current;

    useEffect(() => {
      const delay = index * 40;
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 240, delay, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 240, delay, useNativeDriver: true }),
      ]).start();
    }, [index, opacity, translateY]);

    return <Animated.View style={{ opacity, transform: [{ translateY }] }}>{children}</Animated.View>;
  };

  return (
    <Container>
      {loading && <Text>Carregando...</Text>}
      {!loading && error && <Text>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
          renderItem={({ item, index }) => (
            <AnimatedCard index={index}>
              <ItemCard>
              {isValidImageUrl(item.imageUrl) ? (
                <Thumb source={{ uri: item.imageUrl }} />
              ) : (
                <ThumbFallback />
              )}
              <Info>
                <Name>{item.name}</Name>
                <Status>{item.available ? 'Disponível' : 'Indisponível'}</Status>
              </Info>
              <Actions>
                <Price>{`R$ ${Number(item.price).toFixed(2)}`}</Price>
                {item.available ? (
                  (() => {
                    const existing = cartItems.find((i) => i.product.id === item.id);
                    if (!existing) {
                      return (
                        <Button
                          title="Adicionar"
                          variant="secondary"
                          onPress={() =>
                            addItem({ id: item.id, name: item.name, price: Number(item.price), imageUrl: item.imageUrl })
                          }
                        />
                      );
                    }
                    return (
                      <QtyControls>
                        <QtyButton onPress={() => decrementQty(item.id)}>
                          <QtyText>-</QtyText>
                        </QtyButton>
                        <QtyText>{existing.qty}</QtyText>
                        <QtyButton onPress={() => incrementQty(item.id)}>
                          <QtyText>+</QtyText>
                        </QtyButton>
                      </QtyControls>
                    );
                  })()
                ) : (
                  <Button title="Indisponível" variant="secondary" disabled />
                )}
              </Actions>
              </ItemCard>
            </AnimatedCard>
          )}
        />
      )}
    </Container>
  );
}