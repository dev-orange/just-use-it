import { ConfigurableWindow, defaultWindow } from '../utils/configurable';
import { useState } from 'react';
import { useEventListener } from '../useEventListener';

export const usePreferredLanguages = (options: ConfigurableWindow = {}): Readonly<string[]> => {
  const { window = defaultWindow } = options;

  const navigator = window?.navigator;

  const [languages, setLanguages] = useState<readonly string[]>(navigator.languages);

  useEventListener(window, 'languagechange', () => {
    if (navigator) {
      setLanguages(navigator.languages);
    }
  });

  return languages;
};
