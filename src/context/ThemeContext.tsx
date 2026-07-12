// src/context/ThemeContext.tsx
// Context pour le mode sombre (dark mode), accessible partout via useDarkMode().
import { createContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'buur_sine_theme';

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialisation "paresseuse" du state : la fonction n'est exécutée qu'une seule fois,
  // au tout premier rendu, pour lire la préférence déjà enregistrée dans le localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'dark';
  });

  // Ajoute/retire la classe "dark" sur <html> pour activer les variantes dark: de Tailwind
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = (): void => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
