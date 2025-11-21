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

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export default function NovaSenhaScreen({ navigation }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  return (
    <Container>
      <Title>Nova senha</Title>
      <Input label="Nova senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Input label="Confirmar nova senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      {error ? <ErrorText>{error}</ErrorText> : null}
      <Button
        title="Confirmar"
        onPress={() => {
          if (!password || !confirmPassword) {
            setError('Preencha todos os campos.');
            return;
          }
          if (password !== confirmPassword) {
            setError('As senhas não conferem.');
            return;
          }
          setError(null);
          navigation.navigate('SenhaAlterada');
        }}
      />
    </Container>
  );
}