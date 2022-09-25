import { useState } from 'react';
import { ConfigurableWindow, defaultWindow } from '../utils/configurable';
import { useEventListener } from '../useEventListener';

export interface NavigatorLanguageState {
  isSupported: boolean;
  language: string | undefined;
}

export const useNavigatorLanguage = (
  options: ConfigurableWindow = {}
): Readonly<NavigatorLanguageState> => {
  const { window = defaultWindow } = options;

  const navigator = window?.navigator;

  const isSupported = Boolean(navigator && 'language' in navigator);

  const [language, setLanguage] = useState(navigator?.language);

  useEventListener(window, 'languagechange', () => {
    if (navigator) {
      setLanguage(navigator.language);
    }
  });

  return {
    isSupported,
    language,
  };
};
