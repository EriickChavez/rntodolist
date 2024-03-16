import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  buttonTick: {
    marginRight: 10,
  },
  indicator: {
    width: 5,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  shadowsSuccess: {
    borderWidth: 2,
    borderColor: '#81C784',
    shadowColor: '#81C784',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadows: {
    borderWidth: 2,
    borderColor: '#28BEF5',
    shadowColor: '#080708',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: RFValue(12),
  },
  textChecked: {
    textDecorationLine: 'line-through',
  },
  trashContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 2,
  },
});
