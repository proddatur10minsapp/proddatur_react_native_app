import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import CartIcon from 'react-native-vector-icons/Feather';
import FooterNavigation from '../FooterNavigation';
import GradientBackground from '../GradientBackground';
import { useGlobalStore } from '../../utils/GlobalStoreContext';
import styles from './CategoryProductsScreen.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GAP = 16;
const CARD_W = (SCREEN_WIDTH - GAP * 3) / 2;

export default function CategoryProductScreen({ route, navigation }) {
  let store = useGlobalStore();
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://proddaturbackendcode-production.up.railway.app/users/products/getProducts/${category}`
        );
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('fetch products error', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id, categoryName: category })}
      >
        <View style={styles.imageBox}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

        <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
        <Text style={styles.qty}>{item.quantity} Kg</Text>

        <View style={styles.priceBlock}>
          <Text style={styles.price}>₹{item.discountPrice}</Text>
          {item.price !== item.discountPrice && (
            <Text style={styles.mrp}>₹{item.price}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <CartIcon name="shopping-bag" size={16} color="#fff" />
          <Text style={styles.addTxt}>Add to Bag</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <GradientBackground>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.divider} />
          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loaderTxt}>Loading products...</Text>
            </View>
          ) : (
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={item => item._id ?? item.id?.toString()}
              numColumns={2}
              contentContainerStyle={styles.list}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <FooterNavigation navigation={navigation} active="categories" />
      </SafeAreaView>
    </GradientBackground>
  );
} 
