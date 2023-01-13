import {StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//
const c = {
  // Screens
  containerBackground: 'rgba(255,255,255,1)',
  //
  primaryColor: 'green',
  warningColor: 'red',
  darkGray: 'rgb(72,72,72)',
  lightGray: 'rgb(190,190,190)',
  // Tab
  activeTabColor: 'green',
  inactiveTabColor: 'rgba(30,30,30,.25)',
  // Text
  mainText: '#1e1e1e', //"rgb(76,81,76)",//"rgb(64,64,64)",
  mainTextLight: '#7d7d7d',
  mainTextSuperLight: '#e1e1e1',
  // Borders
  borderLight: 'rgb(190, 190, 190)',
  borderSuperLight: '#e1e1e1',

  // Reservation process
  mainReservationColor: '#7298A8',
  secondaryReservationColor: '#D3FDFF',
  thirdReservationColor: '#707070',
};
global.COLORS = c;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.containerBackground,
  },
  centeredView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  modalCloseButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: height,
    width: width,
    zIndex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: 300,
    width: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalValueText: {
    fontSize: 70,
    marginTop: 20,
    alignSelf: 'center',
  },
  textInputCloseButton: {
    color: COLORS.mainTextLight,
    alignSelf: 'center',
    marginLeft: 5,
  },
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingsHeader: {
    height: 125,
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  spacer: {
    flex: 1,
  },
  headerText: {
    color: '#333',
    fontSize: 28,
    fontWeight: '600',
  },
  buttonText: {
    color: c.mainText,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
  },
  buttonTextSecondary: {
    fontSize: 14,
    color: c.mainTextLight,
  },
  textInput: {
    margin: 15,
    height: 50,
    borderColor: c.borderLight,
    borderWidth: 0.5,
    borderRadius: 6,
    textAlign: 'center',
    color: '#4A4B55',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInputView: {
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 30,
  },
  mainText: {
    fontSize: 15,
    color: '#4A4B55',
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 15,
    color: '#898B95',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  codeConfirmView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    marginBottom: -height / 20,
  },
  numberExampleView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  page: {
    flex: 1,
    alignItems: 'center',
  },
  phoneNumText: {
    marginLeft: width * 0.05,
    marginTop: height / 6,
    color: '#171719',
    fontSize: 18,
  },
  phoneNumTextExample: {
    color: '#575760',
    fontSize: 18,
    marginLeft: width * 0.05,
    marginBottom: 15,
  },
  textInput: {
    width: '90%',
    height: 40,
    backgroundColor: '#F5F6F4',
    borderColor: '#898B95',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000000',
    fontSize: 16,
  },
  themeButton: {
    width: width / 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: width / 2 - width / 10,
    height: 50,
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: c.primaryColor,
    borderRadius: 50,
  },
  themeButtonTitle: {
    fontSize: 16,
    color: '#fff',
  },
  welcomeButton: {
    width: width / 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 50,
    alignItems: 'center',
    backgroundColor: c.primaryColor,
    borderRadius: 50,
    marginBottom: 15,
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    color: c.primaryColor,
    marginTop: 15,
  },
  timer: {
    fontSize: 24,
    color: '#454545',
    width: width,
    textAlign: 'center',
    marginBottom: 15,
  },
  homePageView: {
    padding: 15,
  },
  codeResendButton: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
  },
  codeResendButtonTitle: {
    fontSize: 18,
    color: '#777986',
  },
  codeResendTitleFollow: {
    fontSize: 18,
    color: '#777986',
    textDecorationLine: 'underline',
  },
});
