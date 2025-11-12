import React, { useEffect, useState, useCallback } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../components/Button';
import { get } from '../services/api';
import { useUser } from '../context/UserContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

const Card = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.muted};
`;

const Value = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

const Status = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

const StatusPill = styled.View`
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
`;

const StatusPillText = styled.Text<{ color: string }>`
  font-weight: 700;
  color: ${({ color }) => color};
`;

type OrderItem = {
  productId: string;
  name: string;
  unitPrice: number;
  qty: number;
  subtotal: number;
};

type Order = {
  id: string;
  userID?: string;
  itens: OrderItem[];
  total?: number;
  status: string;
  createdAt: string;
};

export default function AcompanharScreen() {
  const { user } = useUser();
  const theme = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = user?.id ?? 'guest';
      const data = await get<Order[]>(
        'orders',
        { userID: userId, sortBy: 'createdAt', order: 'desc' }
      );
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Erro ao carregar pedidos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
      return undefined;
    }, [user?.id])
  );

  const toggleExpand = (id: string) => {
    setExpandedId((curr) => (curr === id ? null : id));
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const total = item.total ?? item.itens.reduce((s, i) => s + i.unitPrice * i.qty, 0);
    const expanded = expandedId === item.id;
    const statusNorm = (item.status || '').toLowerCase();
    const statusColor =
      statusNorm === 'novo'
        ? theme.colors.primary
        : statusNorm === 'em produção'
        ? theme.colors.warning
        : statusNorm === 'pronto'
        ? theme.colors.success
        : theme.colors.muted;
    const pillTextColor = statusNorm === 'em produção' ? theme.colors.text : '#FFFFFF';
    return (
      <Card style={{ marginBottom: 12, borderColor: statusColor }}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <Row>
            <Label>Pedido</Label>
            <Value>#{item.id}</Value>
          </Row>
          <Row>
            <Label>Status</Label>
            <StatusPill style={{ backgroundColor: statusColor }}>
              <StatusPillText color={pillTextColor}>{item.status}</StatusPillText>
            </StatusPill>
          </Row>
          <Row>
            <Label>Criado</Label>
            <Value>{new Date(item.createdAt).toLocaleString()}</Value>
          </Row>
          <Row>
            <Label>Total</Label>
            <Value>{`R$ ${total.toFixed(2)}`}</Value>
          </Row>
        </TouchableOpacity>
        {expanded && (
          <>
            <Text style={{ marginTop: 12, marginBottom: 8 }}>Itens</Text>
            {item.itens.map((it) => (
              <Row key={`${it.productId}`}>
                <Text>{it.name} × {it.qty}</Text>
                <Text>{`R$ ${(it.subtotal ?? it.unitPrice * it.qty).toFixed(2)}`}</Text>
              </Row>
            ))}
          </>
        )}
      </Card>
    );
  };

  return (
    <Container>
      {loading && <Text>Carregando...</Text>}
      {!loading && error && <Text>{error}</Text>}
      {!loading && !error && orders.length === 0 && <Text>Nenhum pedido encontrado.</Text>}
      {!loading && !error && orders.length > 0 && (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          renderItem={renderOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchOrders} />
          }
          ListFooterComponent={
            <Button title="Atualizar lista" variant="secondary" onPress={fetchOrders} />
          }
        />
      )}
    </Container>
  );
}