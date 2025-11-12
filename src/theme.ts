const theme = {
  colors: {
    primary: '#FF6A00',
    text: '#333333',
    background: '#FFFFFF',
    border: '#EEEEEE',
    muted: '#777777',
    success: '#27AE60',
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
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
};

export default theme;
export type AppTheme = typeof theme;