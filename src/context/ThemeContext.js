'use strict';

'use client';
import { createContext, useContext, useState, useMemo } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [activeColor, setActiveColor] = useState('primary');

  const colors = {
    light: {
      background: '#ffffff',
      text: '#1a1a1a',
      primary: {
        main: '#0070f3',
        light: '#3291ff',
        dark: '#0061d5',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#ff0080',
        light: '#ff4d9c',
        dark: '#d6006b',
        contrastText: '#ffffff'
      },
      accent: {
        main: '#7928ca',
        light: '#8a3deb',
        dark: '#6020a8',
        contrastText: '#ffffff'
      },
      error: {
        main: '#ff4444',
        light: '#ff6b6b',
        dark: '#cc0000',
        contrastText: '#ffffff'
      },
      success: {
        main: '#00c853',
        light: '#5efc82',
        dark: '#009624',
        contrastText: '#ffffff'
      },
      surface: {
        main: '#f5f5f5',
        border: '#e0e0e0',
        hover: '#eeeeee'
      }
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      primary: {
        main: '#3291ff',
        light: '#5ba4ff',
        dark: '#2979ff',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#ff4d9c',
        light: '#ff6ab3',
        dark: '#f50057',
        contrastText: '#ffffff'
      },
      accent: {
        main: '#8a3deb',
        light: '#9d55ff',
        dark: '#7928ca',
        contrastText: '#ffffff'
      },
      error: {
        main: '#ff5252',
        light: '#ff7b7b',
        dark: '#ff0000',
        contrastText: '#ffffff'
      },
      success: {
        main: '#69f0ae',
        light: '#b9f6ca',
        dark: '#00c853',
        contrastText: '#000000'
      },
      surface: {
        main: '#2d2d2d',
        border: '#404040',
        hover: '#3d3d3d'
      }
    }
  };

  const buttonStyles = useMemo(() => ({
    variants: {
      contained: {
        backgroundColor: colors[theme][activeColor].main,
        color: colors[theme][activeColor].contrastText,
        border: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: colors[theme][activeColor].dark,
        }
      },
      outlined: {
        backgroundColor: 'transparent',
        color: colors[theme][activeColor].main,
        border: `1px solid ${colors[theme][activeColor].main}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: colors[theme].surface.hover,
        }
      },
      text: {
        backgroundColor: 'transparent',
        color: colors[theme][activeColor].main,
        border: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: colors[theme].surface.hover,
        }
      }
    },
    sizes: {
      small: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
      },
      medium: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
      },
      large: {
        padding: '1rem 2rem',
        fontSize: '1.125rem',
      }
    }
  }), [theme, activeColor]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeActiveColor = (colorName) => {
    setActiveColor(colorName);
  };

  const value = useMemo(() => ({
    theme,
    colors: colors[theme],
    buttonStyles,
    activeColor,
    toggleTheme,
    changeActiveColor
  }), [theme, buttonStyles, activeColor]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 