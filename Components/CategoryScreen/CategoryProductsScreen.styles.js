import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GAP = 16;
const CARD_W = (SCREEN_WIDTH - GAP * 3) / 2;

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: GAP,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + -30 : 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  loader: {
    marginTop: 40,
    alignItems: 'center',
  },
  loaderTxt: {
    marginTop: 10,
    color: '#555',
  },
  list: {
    paddingBottom: 120,
  },
  card: {
    width: CARD_W,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: GAP,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    height: 110,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  qty: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginRight: 6,
  },
  mrp: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    width: '100%',
    marginTop: 8,
  },
  addTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

