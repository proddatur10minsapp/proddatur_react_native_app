import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons'; 

const OTPVerification = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Countdown Timer
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeText = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next box
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    // Add your OTP verification logic here
  };

  return (
    <View style={tw`flex-1 bg-white justify-center items-center px-5`}>
      {/* Back Button */}
      <TouchableOpacity
        style={tw`absolute top-12 left-5 z-10`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={tw`text-2xl font-semibold mb-5`}>OTP Verification</Text>

      {/* Phone Number */}
      <Text style={tw`text-base text-gray-500 mb-2`}>
        We have sent a verification code to
      </Text>
      <Text style={tw`text-lg font-bold mb-5`}>+91-{phoneNumber}</Text>

      {/* OTP Boxes */}
      <View style={tw`flex-row justify-center mb-5`}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={tw`w-12 h-12 border border-gray-300 rounded-lg text-center text-lg mx-1`}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleChangeText(value, index)}
          />
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={tw`w-full py-4 rounded-lg ${
          otp.join('').length === 4 ? 'bg-gray-500' : 'bg-gray-300'
        }`}
        onPress={handleSubmit}
        disabled={otp.join('').length !== 4}
      >
        <Text style={tw`text-white text-center font-semibold`}>Verify</Text>
      </TouchableOpacity>

      {/* Resend Code */}
      <TouchableOpacity
        disabled={timer > 0}
        onPress={() => {
          console.log('Resend OTP');
          setTimer(30);
        }}
      >
        <Text
          style={tw`text-sm text-gray-400 mt-4 ${
            timer === 0 ? 'text-blue-500' : ''
          }`}
        >
          {timer > 0 ? `Resend Code (in ${timer} secs)` : 'Resend Code'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerification;
