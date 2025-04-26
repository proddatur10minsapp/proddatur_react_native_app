import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  topSection: {
    flexShrink: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  backButton: {
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
    paddingBottom : 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  detailsContainer: {
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  weightPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  weight: {
    fontSize: 14,
    color: '#555',
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mrp: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 6,
  },
  discountPercentage: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  relatedContainer: {
    marginTop: 20,
    marginBottom: 60,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  relatedList: {
    paddingLeft: 4,
  },
  relatedCard: {
    width: 130,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  relatedImage: {
    width: '100%',
    height: 90,
    borderRadius: 6,
    resizeMode: 'contain',
  },
  relatedName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 6,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  relatedAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    marginTop: 8,
    borderRadius: 6,
  },
  relatedAddText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 4,
    fontWeight: '500',
  },
  icon: {
    marginRight: 0,
  },
});
