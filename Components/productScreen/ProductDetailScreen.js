import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import FooterNavigation from '../FooterNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartIcon from 'react-native-vector-icons/Feather';
import GradientBackground from '../GradientBackground';
import { useGlobalStore } from '../../utils/GlobalStoreContext';
import { useFocusEffect } from '@react-navigation/native';
import styles from './ProductDetailScreen.styles';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId, categoryName: initialCategoryName, categoryId: initialCategoryId } = route.params;
  const store = useGlobalStore();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [categoryId, setCategoryId] = useState(initialCategoryId);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const loadProductData = async () => {
        try {
          setLoading(true);

          const res = await fetch(`https://proddaturbackendcode-production.up.railway.app/users/products/${productId}`);
          const productData = await res.json();
          if (!isMounted) return;
          setProduct(productData);

          let resolvedCategory = categoryName;
          let resolvedCategoryId = categoryId;

          if (!resolvedCategory && categoryId) {
            const catRes = await fetch(`https://proddaturbackendcode-production.up.railway.app/users/products/category/getCategoryById/${categoryId}`);
            const catData = await catRes.json();
            if (!isMounted) return;
            resolvedCategory = catData.name;
            resolvedCategoryId = catData.id;
            setCategoryName(resolvedCategory);
            setCategoryId(resolvedCategoryId);
          }

          if (resolvedCategory) {
            const relatedRes = await fetch(`https://proddaturbackendcode-production.up.railway.app/users/products/getProducts/${resolvedCategory}`);
            const relatedData = await relatedRes.json();
            if (!isMounted) return;
            const filteredProducts = relatedData.filter(item => item.id !== productId);
            setRelatedProducts(filteredProducts);
          }
        } catch (error) {
          console.error('Error loading product:', error);
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      loadProductData();

      return () => {
        isMounted = false;
      };
    }, [productId])
  );

  const handleAddToBag = (item) => {
    // Handle adding to bag
  };

  const renderRelatedProduct = useCallback(({ item }) => (
    <View style={styles.relatedCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', {
          productId: item.id,
          categoryName: item.category || categoryName,
          categoryId: item.categoryId || categoryId,
        })}
      >
        <Image source={{ uri: item.image }} style={styles.relatedImage} />
        <Text style={styles.relatedName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.relatedPrice}>₹{item.discountPrice}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.relatedAddButton} onPress={() => handleAddToBag(item)}>
        <CartIcon name="shopping-bag" size={16} color="#fff" />
        <Text style={styles.relatedAddText}>Add</Text>
      </TouchableOpacity>
    </View>
  ), [categoryName, categoryId, navigation]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  return (
    <GradientBackground>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-left" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Product Details</Text>
            </View>

            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={styles.detailsContainer}>
              <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

              <View style={styles.weightPriceRow}>
                <Text style={styles.weight}>
                  {product.quantity ? `${product.quantity} ml` : '1 piece'}
                </Text>

                <View style={styles.priceGroup}>
                  <Text style={styles.mrp}>₹{product.price}</Text>
                  <Text style={styles.discountedPrice}>₹{product.discountPrice}</Text>
                  <Text style={styles.discountPercentage}>
                    ({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF)
                  </Text>
                </View>
              </View>
              <Text style={styles.description} numberOfLines={3}>
                Et quidem faciunt, ut summum bonum sit extremum et rationibus conquisitis de voluptate...
              </Text>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToBag(product)}>
              <CartIcon name="shopping-bag" size={18} color="#fff" style={styles.icon} />
              <Text style={styles.addButtonText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>

          {relatedProducts.length > 0 && (
            <View style={styles.relatedContainer}>
              <Text style={styles.relatedTitle}>Customers also liked</Text>
              <FlatList
                data={relatedProducts}
                renderItem={renderRelatedProduct}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedList}
              />
            </View>
          )}
        </View>

        <FooterNavigation navigation={navigation} active="categories" />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default ProductDetailScreen;
