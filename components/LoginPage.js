import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const LoginPage = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLogin = () => {
    navigation.navigate('OTPVerification', { phoneNumber: mobileNumber });
  };

  return (
    <View style={tw`flex-1 bg-white justify-center items-center px-5`}>
      {/* Title */}
      <Text style={tw`text-2xl font-semibold text-center mb-1`}>
        Proddatur's instant Delivery App
      </Text>
      <Text style={tw`text-base text-gray-500 mb-6`}>Log in or Sign up</Text>

      {/* Mobile Number Input */}
      <View style={tw`flex-row border border-gray-300 rounded-lg items-center px-3 mb-5`}>
        <Text style={tw`text-base text-black mr-2`}>+91</Text>
        <TextInput
          style={tw`flex-1 text-base py-3`}
          placeholder="Enter mobile number"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          maxLength={10}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={tw`w-full py-4 rounded-lg ${
          mobileNumber.length === 10 ? 'bg-gray-500' : 'bg-gray-300'
        }`}
        onPress={handleLogin}
        disabled={mobileNumber.length !== 10}
      >
        <Text style={tw`text-white text-center font-semibold`}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
