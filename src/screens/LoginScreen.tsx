import React, { useState } from 'react';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { get } from '../services/api';
import { useUser } from '../context/UserContext';

type Props = {
  navigation: any;
  onSignedIn: () => void;
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const LogoBox = styled.View`
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Link = styled.TouchableOpacity`
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const LinkText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const ErrorText = styled.Text`
  color: #D32F2F;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

export default function LoginScreen({ navigation, onSignedIn }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useUser();

  const handleLogin = async () => {
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();
    if (!emailTrimmed || !passwordTrimmed) {
      setError('Informe e-mail e senha.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const users = await get<Array<{ id: string; name: string; email: string; password: string }>>('users', {
        email: emailTrimmed,
      });
      const user = users?.[0];
      if (user && user.password === passwordTrimmed) {
        signIn({ id: user.id, name: user.name, email: user.email });
        onSignedIn();
      } else {
        setError('E-mail ou senha inválidos.');
      }
    } catch (e) {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <Content>
        <LogoBox>
          <Ionicons name="fast-food" size={64} color="#FF6A00" />
          <Title>Bem vindo</Title>
        </LogoBox>
        <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} />
        {error ? <ErrorText>{error}</ErrorText> : null}
        <Link onPress={() => navigation.navigate('Cadastro')}> 
          <LinkText>Criar conta</LinkText>
        </Link>
        <Link onPress={() => navigation.navigate('NovaSenha')}>
          <LinkText>Esqueci minha senha</LinkText>
        </Link>
      </Content>
    </Container>
  );
}