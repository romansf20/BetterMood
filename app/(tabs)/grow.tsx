import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import BreathingAnimation from "../Breath";

export default function GrowScreen({ resetAnimation }) {
  const [activeTab, setActiveTab] = useState('Calm');
  const [animationKey, setAnimationKey] = useState(0); // Key for animation restart

  // Increment animation key whenever screen renders
  React.useEffect(() => {
		if (resetAnimation) {
      // Handle reset logic if needed (e.g., restarting animation)
			setAnimationKey((prevKey) => prevKey + 1);
    }
    
  }, [resetAnimation]);

  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('@/assets/images/grow.png')}
        style={styles.headerImage}
      />

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('Calm')}
          >
            <Text style={[styles.tabText, activeTab === 'Calm' && styles.activeTabText]}>Calm</Text>
            {activeTab === 'Calm' && <View style={styles.activeLine} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('Sleep')}
          >
            <Text style={[styles.tabText, activeTab === 'Sleep' && styles.activeTabText]}>Sleep</Text>
            {activeTab === 'Sleep' && <View style={styles.activeLine} />}
          </TouchableOpacity>
        </View>
        <View style={styles.breathingAnimationContainer}>
          {/* Use the animationKey to remount BreathingAnimation */}
          <BreathingAnimation key={animationKey} activeTab={activeTab} />
        </View>
      </View>
    </View>
  );
}

const SELECTED_STATE_COLOR = "#54487f";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 376,
    marginTop: 0,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
    marginTop: -26,
  },
  breathingAnimationContainer: {
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: 'black',
  },
  activeLine: {
    position: 'absolute',
    bottom: 2,
    height: 2,
    width: '120%',
    backgroundColor: SELECTED_STATE_COLOR,
  },
});
