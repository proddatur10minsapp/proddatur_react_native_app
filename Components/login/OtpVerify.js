import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBackground from '../GradientBackground';

const OTPVerification = ({ navigation, route }) => {
  const { phoneNumber, token } = route.params;

  const [otp, setOtp]         = useState('');
  const [timer, setTimer]     = useState(30);
  const [loading, setLoading] = useState(false);

  /* countdown */
  useEffect(() => {
    const id = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* verify */
  const handleSubmit = async () => {
    if (otp.length !== 6) return;
    setLoading(true);

    try {
      const res = await fetch(
        'https://backendcodenodejs-production.up.railway.app/api/verify-otp',
        {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({ token, userOtp: otp }),
        },
      );

      const data = await res.json();

      if (res.ok && data.success) {
        /* -------- NEW: save the JWT -------- */
        if (data.loginToken) {
          await AsyncStorage.setItem('authToken', data.loginToken);
        }
        /* navigate to the next screen */
        navigation.navigate('location');
      } else {
        Alert.alert('Verification Failed', data?.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('verify‑otp error', err);
      Alert.alert('Network Error', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1 bg-white`}
      >
        {/* back */}
        <TouchableOpacity
          style={tw`mt-12 ml-5`}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* content */}
        <View style={tw`flex-1 px-6 pt-40`}>
          <Text style={tw`text-3xl font-bold mb-4`}>
            Enter your 6‑digit code
          </Text>

          <Text style={tw`text-lg text-gray-600 mb-2`}>
            We have sent a verification code to
          </Text>
          <Text style={tw`text-xl font-bold text-black mb-6`}>
            +91‑{phoneNumber}
          </Text>

          {/* otp input */}
          <TextInput
            style={tw`w-full h-14 border-b border-gray-300 text-2xl tracking-widest mb-6`}
            maxLength={6}
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
            placeholder="- - - - - -"
            placeholderTextColor="#ccc"
            editable={!loading}
          />

          {/* resend link */}
          <TouchableOpacity
            disabled={timer > 0 || loading}
            onPress={() => setTimer(30)}   /* call resend API if needed */
          >
            <Text
              style={[
                tw`text-base mb-6`,
                { color: timer === 0 ? '#32CD32' : '#aaa' },
              ]}
            >
              {timer > 0 ? `Resend Code (in ${timer} secs)` : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* submit */}
        <View style={tw`absolute bottom-10 right-6`}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={otp.length !== 6 || loading}
            style={[
              tw`w-16 h-16 rounded-full items-center justify-center`,
              { backgroundColor: otp.length === 6 ? '#32CD32' : '#ccc' },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons name="arrow-forward" size={28} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default OTPVerification;
