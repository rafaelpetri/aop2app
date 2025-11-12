import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary';
};

const Wrapper = styled.TouchableOpacity<{ variant: 'primary' | 'secondary' }>`
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.background};
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.border};
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text<{ variant: 'primary' | 'secondary' }>`
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.background : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 600;
`;

export default function Button({ title, variant = 'primary', ...rest }: Props) {
  return (
    <Wrapper variant={variant} activeOpacity={0.8} {...rest}>
      <Label variant={variant}>{title}</Label>
    </Wrapper>
  );
}