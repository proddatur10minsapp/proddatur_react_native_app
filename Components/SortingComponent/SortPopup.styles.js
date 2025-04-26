// components/SortPopup.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    width: '80%',
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selected: {
    color: '#00cc99',
    fontWeight: 'bold',
  },
});
