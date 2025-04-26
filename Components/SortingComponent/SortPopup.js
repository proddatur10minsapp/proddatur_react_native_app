import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './SortPopup.styles';

const SortPopup = ({ visible, onClose, onSelect, selectedSort }) => {
  const options = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Price: Low to High', value: 'priceLowToHigh' },
    { label: 'Price: High to Low', value: 'priceHighToLow' },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => onSelect(opt.value)}
                style={styles.option}
              >
                <Text style={[styles.optionText, selectedSort === opt.value && styles.selected]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SortPopup;
