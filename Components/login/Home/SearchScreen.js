import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterNavigation from '../../../Components/FooterNavigation';

const POPULAR_SEARCHES = ['Rice', 'Bread', 'Biscuits', 'Milk'];

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const handleSearchPress = (term) => {
    // console.log('Searching:', term);
    // You can navigate or call an API here
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header: Back + Search Input */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <BackIcon name="arrow-left" size={22} color="#444" />
        </TouchableOpacity>

        <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />

        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          autoFocus
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
            <Icon name="x-square" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Popular Searches */}
      <Text style={styles.heading}>Popular Searches</Text>
      <FlatList
        data={POPULAR_SEARCHES}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSearchPress(item)}>
            <Icon name="search" size={18} color="#444" />
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />

      {/* Footer Navigation */}
      <FooterNavigation navigation={navigation} active="home" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
  backIcon: {
    marginRight: 6,
  },
  searchIcon: {
    marginRight: 8,
  },
  clearIcon: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#444',
  },
});
