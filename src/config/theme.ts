export const THEME_CONFIG = {
  colors: {
    primary: '#0494F4',
    primaryHover: '#037ccf',
    primaryLight: 'rgba(4, 148, 244, 0.1)',
    light: {
      bg: '#FFFFFF',
      surface: '#F8F9FA',
      card: '#FFFFFF',
      border: '#E0E0E0',
      textPrimary: '#202124',
      textSecondary: '#5F6368',
      accent: '#0494F4',
    },
    dark: {
      bg: '#202124',
      surface: '#202124',
      card: '#2D2F31',
      border: '#3C4043',
      textPrimary: '#E8EAED',
      textSecondary: '#9AA0A6',
      accent: '#0494F4',
    },
    status: {
      success: '#137333',
      successBg: 'rgba(19, 115, 51, 0.12)',
      warning: '#B06000',
      warningBg: 'rgba(176, 96, 0, 0.12)',
      error: '#C5221F',
      errorBg: 'rgba(197, 34, 31, 0.12)',
      info: '#1A73E8',
      infoBg: 'rgba(26, 115, 232, 0.12)',
    }
  },
  borderRadius: {
    card: 'rounded-2xl',
    button: 'rounded-xl',
    badge: 'rounded-full',
    input: 'rounded-xl',
  }
} as const;
