import LocalizedStrings from 'react-native-localization';
import EN from '../Constants/EN';
import ES from '../Constants/ES';

export const LocalizationService = new LocalizedStrings({
  'en-us': EN,
  en: EN,
  es: ES,
});

export default LocalizationService;
