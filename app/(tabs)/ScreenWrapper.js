import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Dimensions, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import PropTypes from 'prop-types';

const ScreenWrapper = ({ screen: ScreenComponent }) => {
  const translateX = useSharedValue(Dimensions.get('window').width); // Start from right
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    // Reset position and trigger animation on every navigation change
    translateX.value = Dimensions.get('window').width;
    translateX.value = withSpring(0, { 
      damping: 20,
      stiffness: 90,
    });
  }, [navigationState?.index]); // Trigger on tab index change

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ScreenComponent />
    </Animated.View>
  );
};

ScreenWrapper.propTypes = {
  screen: PropTypes.elementType.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ScreenWrapper;
