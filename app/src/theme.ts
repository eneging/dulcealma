// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6600', // Rappi-like Orange
      light: '#FF8533',
      dark: '#CC5200',
      contrastText: '#FFFFFF', // White text on orange background
    },
    secondary: {
      main: '#000000', // Black
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF', // White text on black background
    },
    background: {
      default: '#F5F5F5', // Off-white for the main background to provide contrast
      paper: '#FFFFFF', // Pure white for cards, drawers, etc.
    },
    text: {
      primary: '#000000', // Default text color (Black)
      secondary: '#555555', // Lighter black/dark grey for secondary info
    },
    error: {
      main: '#D32F2F', // Standard Material-UI error red
    },
    warning: {
      main: '#FFA726', // Standard Material-UI warning orange
    },
    info: {
      main: '#2196F3', // Standard Material-UI info blue
    },
    success: {
      main: '#4CAF50', // Standard Material-UI success green
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // You can customize fonts here
    h4: {
      fontWeight: 700,
      color: '#000000', // Black for major headings
    },
    h5: {
      fontWeight: 600,
      color: '#000000',
    },
    h6: {
      fontWeight: 600,
      color: '#FF6600', // Primary orange for filter titles
    },
    subtitle1: {
      fontWeight: 600,
      color: '#FF6600', // Primary orange for category titles
    },
    body1: {
      fontSize: '1rem',
      color: '#000000',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#555555',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Slightly rounded buttons
          textTransform: 'none', // Rappi often uses sentence case
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#CC5200', // Darker orange on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Consistent border radius for cards and sidebars
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // White App Bar
          color: '#000000', // Black text on App Bar
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#FF6600', // Orange checkboxes
          '&.Mui-checked': {
            color: '#FF6600', // Orange when checked
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // All text fields outlined by default
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&.Mui-focused fieldset': {
              borderColor: '#FF6600', // Orange border when focused
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FF6600', // Orange label when focused
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        standardInfo: {
          backgroundColor: '#FFF2E6', // Light orange background for info alerts
          color: '#000000', // Black text for info alerts
          '& .MuiAlert-icon': {
            color: '#FF6600', // Orange icon for info alerts
          },
        },
      },
    },
  },
});

export default theme;