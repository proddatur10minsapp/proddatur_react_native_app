import { StyleSheet } from 'react-native';
import { Platform,Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 30) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'android' ? 15 : 0,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productList: {
    paddingBottom: 20,
  },
  noProductsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 30,
  },
  productCard: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#007bff',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 10,
    color: '#000',
    marginTop: 5,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantityText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  mrp: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
    textDecorationLine: 'line-through',
  },
  addButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  quantityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },
  
  quantityText: {
    fontSize: 12,
    color: '#555',
  },
  clock: {
    width: 10,
    height: 10,
    marginRight:5,
  },
});


export default styles;