import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label?: string;
};

const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
`;

const Field = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function Input({ label, ...rest }: Props) {
  return (
    <Container>
      {label ? <Label>{label}</Label> : null}
      <Field placeholderTextColor="#999" {...rest} />
    </Container>
  );
}