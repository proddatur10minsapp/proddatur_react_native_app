import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import FooterNavigation from '../FooterNavigation';
import GradientBackground from '../GradientBackground';

const categoryGroups = [
  { title: 'Fruits & Vegetables', categories: ['Fruits', 'Vegetables', 'Herbs & Seasonings'] },
  { title: 'Bakery, Cakes & Dairy', categories: ['Bakery Snacks', 'Breads & Buns', 'Cakes & Pastries'] },
  { title: 'Breakfast, Dips & Spreads', categories: ['Breakfast Cereals', 'Spreads, Sauces, Ketchup', 'Pickles & Chutney'] },
  { title: 'Eggs, Meat & Fish', categories: ['Eggs', 'Poultry', 'Fish & Seafood'] },
  { title: 'Masalas, Oils & Dry Fruits', categories: ['Edible Oils', 'Masalas & Spices', 'Dry Fruits',] },
  { title: 'Atta, Rice, Dals & Sugar', categories: ['Atta, Flours & Sooji', 'Rice & Rice Products', 'Salt, Sugar & Jaggery'] },
  { title: 'Chips, Biscuits & Namkeen', categories: ['Namkeen & Savoury Snacks', 'Chips & Corn Snack', 'Biscuits & Cookies'] },
  { title: 'Hot & Cold Beverages', categories: ['Coffee', 'Tea', 'Fruit Juices & Drinks'] },
  { title: 'Instant & Frozen Foods', categories: ['Frozen Veggies & Snacks', 'Noodles, Pasta, Vermicelli', 'Ready to Cook & Eat'] },
  { title: 'Chocolates & Ice Creams', categories: ['Chocolates & Candies', 'Ice Creams & Desserts', 'Indian Mithai','Frozen Icecreams'] },
  { title: 'Gourmet & World Food', categories: ['Sauces, Spreads & Dips', 'Premium Ice Cream', 'Chocolates & Biscuits'] },
  { title: 'Baby Care', categories: ['Baby Bath & Hygiene', 'Baby Food', 'Diapers & Wipes'] },
  { title: 'Health & Hygiene', categories: ['Oral Care', 'Feminine Hygiene', 'Health & Medicines'] },
  { title: "Men's Grooming", categories: ['Shaving Care', 'Skin Care', 'Bathing Essentials'] },
  { title: 'Bath, Body & Hair', categories: ['Baths & Handwash', 'Hair Care', 'Shower Gels & Body Wash'] },
  { title: 'Beauty & Cosmetics', categories: ['Makeup', 'Skin Care', 'Fragrances & Deos'] },
  { title: 'Detergents & Cleaning', categories: ['All Purpose Cleaner', 'Mops, Brushes & Scrubs', 'Detergents & Dishwash'] },
  { title: 'Kitchen, Pooja & Homeware', categories: ['Cookware & Non-Stick', 'Kitchen Accessories', 'Pooja Essentials'] },
  { title: 'Electronics', categories: ['Audio Devices', 'Smart Wearables', 'Phone & Laptop Accessories'] },
  { title: 'Pet Care', categories: ['Dog Food', 'Cat Food', 'Treats'] },
  { title: 'Fashion', categories: ['Women', 'Men', 'Footwear'] },
];

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://proddaturbackendcode-production.up.railway.app/users/products/category/allCategory'
        );
        const json = await response.json();
        setCategories(json || []);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('CategoryProductsScreen', { category: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Loading categories...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {categoryGroups.map((group) => {
              const groupItems = categories.filter((cat) => group.categories.includes(cat.name));
              if (groupItems.length === 0) return null;

              return (
                <View key={group.title} style={styles.section}>
                  <Text style={styles.sectionTitle}>{group.title}</Text>
                  <FlatList
                    data={groupItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.row}
                  />
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
      <FooterNavigation navigation={navigation} active="categories" />
    </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + -16 : 16,
    // paddingTop: 16
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default CategoryScreen;