import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingVertical: 10,
  },
  title: {
    fontSize: RFValue(20),
  },
  inputContainer: {},
  input: {
    marginTop: 5,
    fontSize: RFValue(15),
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 2,
  },
  inputLabelText: {
    fontSize: RFValue(12),
    fontWeight: '500',
  },
  inputLabelCount: {
    fontSize: RFValue(6),
    paddingBottom: RFValue(2),
    fontWeight: 'bold',
  },
  textAreaContainer: {
    marginTop: 10,
    flex: 1,
  },
  textArea: {
    flex: 1,
    textAlignVertical: 'top',
    paddingTop: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonCancel: {
    borderWidth: 2,
  },
  buttonConfirm: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonText: {
    fontSize: RFValue(12),
    fontWeight: '500',
  },
});
