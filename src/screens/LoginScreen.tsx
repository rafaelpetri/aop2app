import React, { useState } from 'react';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';

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

export default function LoginScreen({ navigation, onSignedIn }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Content>
        <LogoBox>
          <Ionicons name="fast-food" size={64} color="#FF6A00" />
          <Title>Bem vindo</Title>
        </LogoBox>
        <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Entrar" onPress={onSignedIn} />
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