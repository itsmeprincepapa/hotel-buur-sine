// src/hooks/useDarkMode.ts
// Hook personnalisé : raccourci pour lire le ThemeContext (dark mode) depuis n'importe quel composant.
import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext';

export function useDarkMode(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useDarkMode doit être utilisé à l'intérieur d'un ThemeProvider");
  }
  return context;
}
