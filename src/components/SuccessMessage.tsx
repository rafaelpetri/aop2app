import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';

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
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.08, duration: 600, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1.0, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    });
  }, [opacity, scale]);

  return (
    <Box>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Ionicons name="checkmark-circle" size={56} color="#27AE60" />
      </Animated.View>
      <Message>{text}</Message>
    </Box>
  );
}