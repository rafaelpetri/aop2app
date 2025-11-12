import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  text: string;
};

const Box = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Message = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;

export default function SuccessMessage({ text }: Props) {
  return (
    <Box>
      <Ionicons name="checkmark-circle" size={56} color="#27AE60" />
      <Message>{text}</Message>
    </Box>
  );
}