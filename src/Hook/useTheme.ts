import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { ThemeType } from '../@Types/theme';

const useTheme = (): ThemeType => {
  const theme = useNavigationTheme();

  return {
    // @ts-ignore
    colors: theme.colors,
    dark: theme.dark,
  };
};

export default useTheme;
