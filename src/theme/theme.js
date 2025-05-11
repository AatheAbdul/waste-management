// Theme configuration for EcoCrush
const theme = {
  colors: {
    primary: '#2E7D32',  // Dark green
    secondary: '#81C784', // Light green
    background: '#F5F5F5',
    text: '#333333',
    white: '#FFFFFF',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#FFA000'
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'uppercase'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    round: '50%'
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};

export default theme;