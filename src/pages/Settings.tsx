// src/pages/Settings.tsx
// Page des préférences de l'application : pour l'instant, juste le mode sombre,
// géré via useDarkMode (useContext branché sur ThemeContext).
import { useDarkMode } from '../hooks/useDarkMode';

export function Settings() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Paramètres</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Préférences de l'application</p>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-100">Mode sombre</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Affiche l'interface avec un thème sombre, plus confortable en soirée.
            </p>
          </div>

          <button
            onClick={toggleDarkMode}
            role="switch"
            aria-checked={darkMode}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              darkMode ? 'bg-[#8A5A34]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
