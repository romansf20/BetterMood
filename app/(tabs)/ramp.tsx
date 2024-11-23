import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  return (
    <Pressable style={styles.container} onPress={onLogin}>
      <Image
        source={require('@/assets/images/ramp.png')} // Ensure correct path
        style={styles.headerImage}
      />
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
		marginLeft: -1,
    transform: [{ scale: 0.99 }], // Scale image proportionally to 98%
  },
});

export default LoginScreen;
