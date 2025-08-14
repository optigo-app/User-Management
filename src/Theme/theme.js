import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
        color: '#6B7280',
    },
    palette: {
        primary: {
            title: '#6B7280',
            subtitle: '#9CA3AF',
            main: '#7367f0',
            contrastText: '#fff',
            light: '#e5e7eb',
            dark: '#6B7280',
            error: '#F87171',
            primaryGradient:
                'linear-gradient(270deg, rgba(115, 103, 240, 0.7) 0%, #7367f0 100%)',
            secondaryGradient:
                'linear-gradient(270deg, rgba(255, 165, 0, 0.7) 0%, #FFA500 100%)',
        },
    },
    shape: {
        borderRadius: 8,
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(0, 0, 0, 0.08)',
        '0px 4px 8px rgba(0, 0, 0, 0.10)',
        '0px 6px 12px rgba(0, 0, 0, 0.12)',
        '0px 8px 16px rgba(0, 0, 0, 0.14)',
        ...Array(20).fill('0px 4px 8px rgba(0, 0, 0, 0.12)'),
    ],
    custom: {
        primaryGradient:
            'linear-gradient(270deg, rgba(115, 103, 240, 0.7) 0%, #7367f0 100%)',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: '"Poppins", sans-serif',
                },
                input: {
                    fontFamily: '"Poppins", sans-serif',
                    color: '#6B7280',
                },
                select: {
                    fontFamily: '"Poppins", sans-serif',
                    color: '#6B7280',
                },
                textarea: {
                    fontFamily: '"Poppins", sans-serif',
                    color: '#6B7280',

                },
                'input::placeholder': {
                    fontFamily: '"Poppins", sans-serif',
                    color: '#6B7280',
                },
                label: {
                    color: '#6B7280',
                },
            },
        },

        // ✅ Buttons
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: '"Poppins", sans-serif',
                    borderRadius: 8,
                    textTransform: 'none',
                    boxShadow: '0px 4px 8px rgba(115, 103, 240, 0.1)',
                    '&:hover': {
                        boxShadow: '0px 6px 12px rgba(115, 103, 240, 0.2)',
                    },
                },
                containedPrimary: {
                    background:
                        'linear-gradient(270deg, rgba(115, 103, 240, 0.7) 0%, #7367f0 100%)',
                    color: '#fff',
                },
            },
        },

        // ✅ AppBar
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background:
                        'linear-gradient(270deg, rgba(115, 103, 240, 0.7) 0%, #7367f0 100%)',
                    color: '#fff',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                },
            },
        },

        // ✅ Tabs & Tab Indicator
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    height: 4,
                    borderRadius: 4,
                    background:
                        'linear-gradient(270deg, rgba(115, 103, 240, 0.7) 0%, #7367f0 100%)',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: '"Poppins", sans-serif',
                    textTransform: 'none',
                    '&.Mui-selected': {
                        color: '#7367f0',
                    },
                },
            },
        },

        // ✅ Paper & Cards
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
                },
            },
        },

        // ✅ TextFields
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
                    },
                },
            },
        },

        // ✅ Table Containers
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
                },
            },
        },
    },
});

export default theme;
