import { Theme } from '../@Types/theme';
import { darkColors, lightColors } from './colors';

const themes: Theme = {
  dark: {
    colors: {
      background: darkColors.background,
      text: darkColors.text,
      border: darkColors.border,
      card: darkColors.card,
      danger: darkColors.danger,
      light_error: darkColors.light_error,
      icon: darkColors.icon,
      info: darkColors.info,
      input: darkColors.input,
      placeholder: darkColors.placeholder,
      primary: darkColors.primary,
      subtext: darkColors.subtext,
      success: darkColors.success,
      warning: darkColors.warning,
    },
    dark: true,
  },
  light: {
    colors: {
      background: lightColors.background,
      text: lightColors.text,
      border: lightColors.border,
      card: lightColors.card,
      danger: lightColors.danger,
      light_error: lightColors.light_error,
      icon: lightColors.icon,
      info: lightColors.info,
      input: lightColors.input,
      placeholder: lightColors.placeholder,
      primary: lightColors.primary,
      subtext: lightColors.subtext,
      success: lightColors.success,
      warning: lightColors.warning,
    },
    dark: false,
  },
};

export default themes;
