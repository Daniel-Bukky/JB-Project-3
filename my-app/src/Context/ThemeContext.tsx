import { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
    toggleTheme: () => void;
    mode: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const theme = createTheme({
        palette: {
            mode,
        },
    });

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 