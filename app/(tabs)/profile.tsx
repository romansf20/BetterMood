import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('@/assets/images/profile.png')}
        style={styles.headerImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',    // Center horizontally
  },
  headerImage: {
    height: 620,
    resizeMode: 'cover',
    transform: [{ scale: 0.97 }], // Scale image proportionally to 98%
  },
});
