import React from 'react';
import styled from 'styled-components/native';
import SuccessMessage from '../components/SuccessMessage';
import Button from '../components/Button';

type Props = { navigation: any };

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
  justify-content: center;
`;

export default function CadastroSuccessScreen({ navigation }: Props) {
  return (
    <Container>
      <SuccessMessage text="Cadastro realizado com sucesso" />
      <Button title="Login" variant="secondary" onPress={() => navigation.navigate('Login')} />
    </Container>
  );
}