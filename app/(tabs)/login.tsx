import React from 'react';
import { View, Image, TextInput, StyleSheet, Pressable } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  return (
    <Pressable style={styles.container} onPress={onLogin}>
      <Image
        source={require('@/assets/images/login.png')} // Ensure correct path
        style={styles.headerImage}
      />
      <TextInput style={styles.input} placeholder="" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerImage: {
    resizeMode: 'cover',
    transform: [{ scale: 0.98 }], // Scale image proportionally to 98%
  },
  input: {
    position: 'absolute',
    top: 276, // Position the input 150 pixels from the top
		left: 17,
    width: '80%', // Set input width to 80% of the screen width
    height: 40, // Set height for the input box
    borderRadius: 5, // Optional: add rounded corners
    paddingHorizontal: 10, // Add padding inside the input box
  },
});

export default LoginScreen;
