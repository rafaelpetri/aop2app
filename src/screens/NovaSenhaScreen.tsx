import React, { useState } from 'react';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';

type Props = { navigation: any };

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export default function NovaSenhaScreen({ navigation }: Props) {
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Title>Nova senha</Title>
      <Input label="Nova senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Confirmar" onPress={() => navigation.navigate('SenhaAlterada')} />
    </Container>
  );
}