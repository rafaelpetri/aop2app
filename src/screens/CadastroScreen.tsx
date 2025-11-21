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

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export default function CadastroScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await post('users', { name, email, password, createdAt: new Date().toISOString() });
      navigation.navigate('CadastroSuccess');
    } catch (e) {
      setError('Não foi possível realizar o cadastro. Tente novamente.');
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
      <Input label="Confirmar senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      {error ? <ErrorText>{error}</ErrorText> : null}
      <Button title={loading ? 'Enviando...' : 'Confirmar'} onPress={handleSubmit} />
    </Container>
  );
}