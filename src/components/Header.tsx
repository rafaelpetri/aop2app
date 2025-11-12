import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

type Props = {
  title?: string;
  showMenu?: boolean;
};

const Bar = styled.View`
  height: 56px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const MenuButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const RightSpacer = styled.View`
  width: 40px;
`;

export default function Header({ title = '', showMenu = true }: Props) {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <SafeAreaView edges={["top"]}>
      <Bar>
        {showMenu ? (
          <MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={24} color={theme.colors.text} />
          </MenuButton>
        ) : (
          <RightSpacer />
        )}
        <Title>{title}</Title>
        <RightSpacer />
      </Bar>
    </SafeAreaView>
  );
}
