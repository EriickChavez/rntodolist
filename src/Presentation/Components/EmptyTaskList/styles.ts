import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  lottie: {
    width: '100%',
    height: RFValue(250),
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: RFValue(12),
  },
});
