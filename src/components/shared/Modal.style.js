import {Colors} from './ColourSheet';
export default {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  basicButton: {
    borderRadius: 5,
    width: '45%',
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 20,
  },
  bottomButtonContainer: {
    width: '100%',
    height: 40,
  },
  basicButtonRelative: {
    borderRadius: 5,
    width: '45%',
    padding: 10,
    elevation: 2,
  },
  openButtonRelative: {
    position: 'absolute',
    right: 0,
  },
  closeButtonRelative: {
    position: 'absolute',
    left: 0,
  },
  openButton: {
    right: 20,
  },
  closeButton: {
    left: 20,
  },
  textStyle: {
    color: Colors.light,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
  },
  modalHeading: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  formInline: {
    flexDirection: 'row',
    borderBottomColor: Colors.gray,
    borderTopColor: Colors.gray,
    borderLeftColor: Colors.light,
    borderRightColor: Colors.light,
    borderWidth: 1,
    height: 50,
  },
  formInlineMultiline: {
    flexDirection: 'row',
    borderBottomColor: Colors.gray,
    borderTopColor: Colors.gray,
    borderLeftColor: Colors.light,
    borderRightColor: Colors.light,
    borderWidth: 1,
    flex: 1,
  },
  modalTitle: {
    textAlign: 'left',
    width: '40%',
    fontSize: 20,
    marginTop: 10,
  },
  modalFormInlineText: {
    width: '60%',
    height: 50,
    marginTop: 10,
    fontSize: 20,
  },
  modalFormInlineTextDate: {
    flex: 1,
    height: 50,
    marginTop: 10,
    fontSize: 20,
  },
  modalFormInlineTextTime: {
    height: 50,
    marginTop: 10,
    fontSize: 20,
  },
  modalFormInlineTextHalf: {
    width: '30%',
    height: 50,
    marginTop: 10,
    fontSize: 20,
  },
  modalTextInput: {
    width: '60%',
    textAlignVertical: 'top',
    height: 50,
    fontSize: 20,
  },
  modalfullWidthMultilineTextInput: {
    width: '100%',
    textAlignVertical: 'top',
  },
  errorMessage: {
    color: Colors.highlight,
  },
  successMessage: {
    color: Colors.dark,
  },
};
