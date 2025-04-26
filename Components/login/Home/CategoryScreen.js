import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';

const CategoryScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [categoryId]); 

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); 

  return (
    <View style={tw`flex-1 bg-black px-4`}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={tw`w-1/2 p-2`} onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}>
            <View style={tw`bg-gray-800 rounded-lg p-4`}>
              <Image source={{ uri: item.images[0] }} style={tw`w-full h-32 rounded-lg`} />
              <Text style={tw`text-white mt-2 text-center font-semibold`}>
                {item.title}
              </Text>
              <Text style={tw`text-gray-400 text-center`}>
                ${item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryScreen;
