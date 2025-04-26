import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const tabs = [
  { key: 'home', icon: 'home', screen: 'Home' },
  { key: 'categories', icon: 'grid', screen: 'CategoryScreen' },
  { key: 'cart', icon: 'shopping-bag', screen: 'CartScreen' },
  { key: 'user', icon: 'user', screen: 'UserScreen' },
];

const FooterNavigation = ({ navigation, active }) => {
  return (
    <View style={styles.footer}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => navigation.navigate(tab.screen)}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
              <Icon
                name={tab.icon}
                size={22}
                color={isActive ? '#fff' : '#555'}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',     // NEW
    bottom: 0, left: 0, right: 0, // NEW full‑width stick to bottom
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 25,
  },
  activeIconWrapper: {
    backgroundColor: '#4CAF50',
  },
});

export default FooterNavigation;
