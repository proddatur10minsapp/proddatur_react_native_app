import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import GradientBackground from '../GradientBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidNumber = mobileNumber.length === 10 && name.trim() !== '';

  const handleLogin = async () => {
    setLoading(true);

    const payload = {
      phoneNumber: Number(mobileNumber),
      username: name,
    };

    try {
      const response = await fetch(
        'https://backendcodenodejs-production.up.railway.app/api/send-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        alert(data?.message || 'Something went wrong');
        return;
      }
      if(data.message === 'User already logged in' && data.loginToken) {
        await AsyncStorage.setItem('authToken', data.loginToken);
        navigation.navigate('Home')
        return;
      }
      else if (data.token) {
        navigation.navigate('OTPVerification', {
          phoneNumber: mobileNumber,
          userName: name,
          token: data.token,
        });
      } else {
        console.warn('Unexpected response:', data);
        alert('Unexpected server response. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView style={tw`flex-1`}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1`}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        >
          <ScrollView
            contentContainerStyle={tw`flex-grow justify-center`}
            keyboardShouldPersistTaps="handled"
          >
            <View style={tw`px-5`}>
              <Text style={tw`text-xl font-semibold text-center mb-2`}>
                Get your products with{' '}
                <Text style={tw`text-green-600`}>(PIDA)</Text>
              </Text>
              <Text style={tw`text-sm text-gray-500 text-center mb-6`}>
                Login/sign up to continue
              </Text>

              {/* Name Input */}
              <View style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4`}>
                <TextInput
                  style={tw`text-base`}
                  placeholder="Enter your name"
                  placeholderTextColor="#aaa"
                  value={name}
                  onChangeText={setName}
                  editable={!loading}
                />
              </View>

              {/* Phone Number Input */}
              <View
                style={tw`flex-row border border-gray-300 rounded-lg items-center px-4 py-3 mb-6`}
              >
                <Text style={tw`text-base text-black mr-2`}>+91</Text>
                <TextInput
                  style={tw`flex-1 text-base`}
                  placeholder="Enter phone number"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  maxLength={10}
                  editable={!loading}
                />
              </View>

              {/* Log In Button */}
              <TouchableOpacity
                style={[
                  tw`w-full py-4 rounded-lg flex items-center justify-center`,
                  { backgroundColor: isValidNumber ? '#7ed957' : '#ccc' },
                ]}
                onPress={handleLogin}
                disabled={!isValidNumber || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={tw`text-white text-center font-semibold`}>
                    Log In
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.replace('Home')}
                disabled={loading}
              >
                <Text style={tw`text-center text-blue-500 mt-4`}>
                  Skip the Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default LoginPage;
