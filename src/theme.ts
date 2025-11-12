import { Platform } from 'react-native';

const theme = {
  colors: {
    primary: '#FF6B00',
    secondary: '#263238',
    text: '#263238',
    background: '#FAFAFA',
    border: '#E0E0E0',
    muted: '#777777',
    success: '#2ECC71',
    error: '#E74C3C',
    accent: '#FFD166',
    warning: '#FFD166',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 24,
    xl: 28,
    xxl: 32,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  fonts: {
    regular: Platform.OS === 'android' ? 'Roboto' : 'System',
    medium: Platform.OS === 'android' ? 'Roboto' : 'System',
    bold: Platform.OS === 'android' ? 'Roboto' : 'System',
  },
};

export default theme;
export type AppTheme = typeof theme;
