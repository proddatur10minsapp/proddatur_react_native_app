import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30, // adjust based on logo height
    marginTop: 10,
    marginBottom: 10,
  },
  
  logo: {
    position: 'absolute',
    left: -50, // keeps it slightly padded from the edge
    width: 180,  // ✅ increased from 100
    height: 100, // ✅ increased from 80
    resizeMode: 'contain',
  },
  
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: keeps it consistent
  },
  
  

  // ✅ Search & Location container
  searchLocationWrapper: {
    marginHorizontal: 0, // parent already has horizontal padding
  },

  // ✅ Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterBtn: {
    backgroundColor: '#00cc99',
    borderRadius: 8,
    padding: 6,
    marginLeft: 8,
  },

  // ✅ Location Bar
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  locationText: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
    color: 'white',
  },

  // ✅ Section Title
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    color: '#333',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: '#00cc99',
    fontWeight: 'bold',
  },

  // ✅ Category
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  categoryItem: {
    width: '30%',
    marginBottom: 15,
    alignItems: 'center',
  },
  categoryCard: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  categoryText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },

  // ✅ Banner
  banner: {
    backgroundColor: '#e0f7f4',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    position: 'relative',
  },
  bannerText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },

  // ✅ Product Grid
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 80,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    padding: 2,
    marginBottom: 16,
    minHeight: 250,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'left',
    paddingHorizontal: 8,
  },
  discountLabel: {
    position: 'absolute',
    backgroundColor: '#ff6347',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    top: 10,
    left: 10,
    overflow: 'hidden',
  },
  productQty: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
    marginBottom: 6,
    paddingHorizontal: 8,
    textAlign: 'left',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productMrp: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 10,
    alignSelf: 'center',
  },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    marginTop: 10,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  locationDetailsBox: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  locationDetailsTitle: {
    fontSize: 13,
    color: '#555',
  },
  locationDetailsText: {
    fontSize: 16,
    color: '#111',
    fontWeight: 'bold',
    marginTop: 2,
  },

  // ✅ Loading text
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },

  orangeSection: {
    backgroundColor: '#FFF3E0', // light orange
    paddingBottom: 16,
    paddingTop: 10,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  sortHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7f3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#00cc99',
    fontWeight: '500',
  },  
  selectedSortText: {
    marginLeft: 8,
    color: '#00cc99',
    fontSize: 13,
    fontStyle: 'italic',
  },
  gridLoaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // optional dim effect
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  }  
});
