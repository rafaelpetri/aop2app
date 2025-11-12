import React, { useState } from 'react';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';

type Props = {
  navigation: any;
};

const Container = styled.ScrollView`
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

export default function CadastroScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Title>Cadastro</Title>
      <Input label="Nome" value={name} onChangeText={setName} />
      <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Confirmar" onPress={() => navigation.navigate('CadastroSuccess')} />
    </Container>
  );
}