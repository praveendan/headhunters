import {Colors} from './ColourSheet';
export default {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    textAlign: 'center',
  },
};
