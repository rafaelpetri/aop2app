import React, { useState } from 'react';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';
import { post } from '../services/api';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      return;
    }
    try {
      setLoading(true);
      await post('users', { name, email, password, createdAt: new Date().toISOString() });
      navigation.navigate('CadastroSuccess');
    } catch (e) {
      // TODO: exibir mensagem de erro amigável
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <Title>Cadastro</Title>
      <Input label="Nome" value={name} onChangeText={setName} />
      <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={loading ? 'Enviando...' : 'Confirmar'} onPress={handleSubmit} />
    </Container>
  );
}