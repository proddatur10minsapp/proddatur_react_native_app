import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import FooterNavigation from '../../../Components/FooterNavigation';
import styles from './HomeStyles/HomeScreen.styles';
import SortPopup from '../../SortingComponent/SortPopup';
import { formatSortLabel } from '../Home/HomeUtil'; 

const placeholderPhrases = [
  'Search "ice cream"',
  'Search "fresh fruits"',
  'Search "daily essentials"',
  'Search "snacks"',
  'Search "cold drinks"',
];

const HomeScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState(placeholderPhrases[0]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [storedAddress, setStoredAddress] = useState(null);
  const [sortVisible, setSortVisible] = useState(false);
const [selectedSort, setSelectedSort] = useState('relevance');
const [productsLoading, setProductsLoading] = useState(false);
  const indexRef = useRef(0);
  const addressFromParams = useMemo(() => {
    return (
      route?.params?.userAddress ||
      '6391 Elgin St. Celina, Delaware 10299'
    );
    
  }, [route?.params?.userAddress, storedAddress]);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % placeholderPhrases.length;
      setPlaceholder(placeholderPhrases[indexRef.current]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('https://proddaturbackendcode-production.up.railway.app/users/products/category/allCategory'),
          fetch('https://proddaturbackendcode-production.up.railway.app/users/products/allProducts'),
        ]);

        const categoriesData = await catRes.json();
        const productsData = await prodRes.json();

        setCategories(categoriesData);
        setProducts(productsData);
        setTimeout(() => setLoading(false), 300);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchSortedProducts = async (sortType) => {
    setSortVisible(false);
    setProductsLoading(true);
  
    try {
      const response = await fetch(
        `https://backendcodenodejs-production.up.railway.app/api/products?sort=${sortType}`
      );
  
      const data = await response.json();
  
      if (data.success && Array.isArray(data.products)) {
        setSelectedSort(sortType);
        setProducts(data.products);
      } else {
        console.warn('Unexpected response:', data);
      }
    } catch (error) {
      console.error('Error fetching sorted products:', error);
    } finally {
      setProductsLoading(false);
    }
  };
  
  

  const renderCategory = (item) => (
    <View key={item.id} style={styles.categoryItem}>
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() =>
          navigation.navigate('CategoryProductsScreen', {
            category: item.name,
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      </TouchableOpacity>
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  const renderProduct = (item) => {
    const discount = Math.round(((item.price - item.discountPrice) / item.price) * 100);
  
    return (
      <View key={item.id || item._id} style={styles.productCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', { productId: item.id ,categoryId: item.category})}
        >
          <Image source={{ uri: item.image }} style={styles.productImage} />
          {discount > 0 && <Text style={styles.discountLabel}>{discount}% OFF</Text>}
          <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.productQty}>{item.quantity} ml</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>₹{item.discountPrice}</Text>
            <Text style={styles.productMrp}>₹{item.price}</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.addBtn}
        >
          <Icon name="shopping-bag" size={16} color="#fff" />
          <Text style={styles.addBtnText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 3);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00cc99" />
        <Text style={styles.loadingText}>Loading HomePage...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
  
      {/* Logo and Search + Location (Fixed Top Section) */}
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>ManaKart</Text>
      </View>
  
      <View style={styles.searchLocationWrapper}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#aaa" />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={1}
          >
            <Text style={styles.searchInput}>{placeholder}</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.locationBar}>
          <MaterialIcons name="location-on" size={20} color="#00cc99" />
          <TouchableOpacity>
            <Text style={styles.locationText} numberOfLines={1}>
              {addressFromParams}
            </Text>
          </TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#00cc99" />
        </View>
      </View>
  
      {/* ✅ Now scroll everything below this */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ✅ Category Section with orange background */}
        <View style={styles.orangeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop By Category</Text>
            {categories.length > 4 && (
              <TouchableOpacity onPress={() => setShowAllCategories(!showAllCategories)}>
                <Text style={styles.seeAllText}>
                  {showAllCategories ? 'Show Less' : 'See All'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.categoryContainer}>
          {displayedCategories.map((item) => renderCategory(item))}
          </View>
        </View>
  
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Video will be added soon</Text>
        </View>
  
        {/* All Products + Sort */}
        <View style={styles.sortHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setSortVisible(true)} style={styles.sortButton}>
              <Icon name="filter" size={16} color="#00cc99" />
              <Text style={styles.sortButtonText}>
                {selectedSort === 'relevance' ? 'Sort' : formatSortLabel(selectedSort)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.productGrid}>
          {products.map((item) => (
            <React.Fragment key={item.id || item._id}>
              {renderProduct(item)}
            </React.Fragment>
          ))}

          {productsLoading && (
            <View style={styles.gridLoaderOverlay}>
              <ActivityIndicator size="large" color="#00cc99" />
              <Text style={styles.loadingText}>Loading Products...</Text>
            </View>
          )}
        </View>

      </ScrollView>
  
      <FooterNavigation navigation={navigation} active="home" />
  
      <SortPopup
        visible={sortVisible}
        onClose={() => setSortVisible(false)}
        onSelect={fetchSortedProducts}
        selectedSort={selectedSort}
      />
    </SafeAreaView>
  );
  
  
};

export default HomeScreen;
