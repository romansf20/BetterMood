import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
			<Image
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				source={require('@/assets/images/check.png')}
				style={[styles.headerImage]}
				/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
	headerImage: {
    width: '100%',
    height: 540,
    resizeMode: 'cover',		
		marginBottom: 55
  },
});
