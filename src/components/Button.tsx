import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, TouchableOpacityProps } from 'react-native';

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

export default function Button({ title, variant = 'primary', onPressIn, onPressOut, ...rest }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn: TouchableOpacityProps['onPressIn'] = (e) => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 20, bounciness: 0 }).start();
    onPressIn && onPressIn(e as any);
  };

  const handlePressOut: TouchableOpacityProps['onPressOut'] = (e) => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 0 }).start();
    onPressOut && onPressOut(e as any);
  };

  const AnimatedWrapper = Animated.createAnimatedComponent(Wrapper);

  return (
    <AnimatedWrapper
      variant={variant}
      activeOpacity={0.8}
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ transform: [{ scale }] }}
    >
      <Label variant={variant}>{title}</Label>
    </AnimatedWrapper>
  );
}