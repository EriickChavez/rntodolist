import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';

import { Theme } from '@react-navigation/native';
import themes from './src/Themes/themes';
import Navigation from './src/Navigation/Navigation';

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const systemColorScheme = useColorScheme();

  const [appTheme, setAppTheme] = useState<Theme>(
    (systemColorScheme === 'dark'
      ? themes.dark
      : themes.light) as unknown as Theme,
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setAppTheme(
        (colorScheme === 'dark'
          ? themes.dark
          : themes.light) as unknown as Theme,
      );
    });

    return () => subscription.remove();
  }, []);

  return <Navigation theme={appTheme} />;
};

export default App;
