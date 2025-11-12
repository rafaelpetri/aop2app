import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { categories } from '../data/categories';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const ListWrapper = styled.View`
  flex: 1;
`;

const ItemButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const IconCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 106, 0, 0.12);
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
`;

const RightIcon = styled(Ionicons)`
  margin-left: auto;
`;

export default function CardapioScreen() {
  const navigation = useNavigation<any>();

  const handlePress = (item: typeof categories[number]) => {
    if (item.name === 'Promoções') {
      navigation.navigate('Promocoes' as never);
      return;
    }
    navigation.navigate('Produtos' as never, { category: item.name } as never);
  };

  const renderItem: ListRenderItem<typeof categories[number]> = ({ item }) => (
    <ItemButton activeOpacity={0.85} onPress={() => handlePress(item)}>
      <IconCircle>
        <Ionicons name={item.icon as any} size={22} color="#FF6A00" />
      </IconCircle>
      <Label>{item.name}</Label>
      <RightIcon name="chevron-forward" size={18} color="#999" />
    </ItemButton>
  );

  return (
    <Container>
      <ListWrapper>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
        />
      </ListWrapper>
    </Container>
  );
}