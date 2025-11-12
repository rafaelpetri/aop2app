import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export default function AcompanharScreen() {
  return (
    <Container>
      <Text>Acompanhar</Text>
    </Container>
  );
}