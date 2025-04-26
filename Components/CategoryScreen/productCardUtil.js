import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import clock from '../../assets/products/deilvery clock.png';
import styles from './CPScreen.styles';

export const renderProductCard = ({ item }) => {
  const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

  return (
    <View style={styles.productCard}>
      <View>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        )}
      </View>
      <View style={styles.quantityBadge}>
        <Text style={styles.quantityText}>{item.quantity} g</Text>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.deliveryTime}>
        <Image source={clock} style={styles.clock} /> {item.deliveryTime} MINS
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.mrp}>MRP {item.mrp}</Text>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};
