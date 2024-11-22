import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

// Animation duration and size constants
const WORD_FADE_IN_DURATION = 400;
const WORD_FADE_OUT_DURATION = 200;
const INHALE_DURATION = 4000;
const EXHALE_DURATION = 4000;
const HOLD_DURATION = 4000;
const START_DELAY = 2000;

// Circle size constants
const OUTER_CIRCLE_SIZE = 190;
const INNER_CIRCLE_SIZE_INITIAL = 106;

const BreathingAnimation = () => {
  const circleDiameter = useSharedValue(INNER_CIRCLE_SIZE_INITIAL); // Initial size of the inner circle
  const wordOpacity = useSharedValue(0); // Word opacity
  const [currentWord, setCurrentWord] = useState("Inhale"); // Current word

  useEffect(() => {
    const startAnimation = async () => {
      await new Promise((resolve) => setTimeout(resolve, START_DELAY)); // Initial delay
      while (true) {
        // "Inhale" phase
        setCurrentWord("Inhale");
        wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION }); // Fade in
        await new Promise((resolve) => setTimeout(resolve, WORD_FADE_IN_DURATION)); // Wait for fade-in
        circleDiameter.value = withTiming(OUTER_CIRCLE_SIZE, {
          duration: INHALE_DURATION,
          easing: Easing.linear,
        }); // Expand circle
        await new Promise((resolve) => setTimeout(resolve, INHALE_DURATION)); // Wait for expansion
        wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION }); // Fade out
        await new Promise((resolve) => setTimeout(resolve, WORD_FADE_OUT_DURATION)); // Wait for fade-out

        // "Hold" phase
        setCurrentWord("Hold");
        wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION }); // Fade in
        await new Promise((resolve) => setTimeout(resolve, WORD_FADE_IN_DURATION)); // Wait for fade-in
        await new Promise((resolve) => setTimeout(resolve, HOLD_DURATION)); // Hold for duration
        wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION }); // Fade out
        await new Promise((resolve) => setTimeout(resolve, WORD_FADE_OUT_DURATION)); // Wait for fade-out

        // "Exhale" phase
        setCurrentWord("Exhale");
        wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION }); // Fade in
        await new Promise((resolve) => setTimeout(resolve, WORD_FADE_IN_DURATION)); // Wait for fade-in
        circleDiameter.value = withTiming(INNER_CIRCLE_SIZE_INITIAL, {
          duration: EXHALE_DURATION,
          easing: Easing.linear,
        }); // Shrink circle
        await new Promise((resolve) => setTimeout(resolve, EXHALE_DURATION)); // Wait for shrink
        wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION }); // Fade out
        await new Promise((resolve) => setTimeout(resolve, WORD_FADE_OUT_DURATION)); // Wait for fade-out

				// "Hold" phase
				setCurrentWord("Hold");
				wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION }); // Fade in
				await new Promise((resolve) => setTimeout(resolve, WORD_FADE_IN_DURATION)); // Wait for fade-in
				await new Promise((resolve) => setTimeout(resolve, HOLD_DURATION)); // Hold for duration
				wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION }); // Fade out
				await new Promise((resolve) => setTimeout(resolve, WORD_FADE_OUT_DURATION)); // Wait for fade-out
      }
    };

    startAnimation();
  }, []);

  // Animated styles
  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      width: circleDiameter.value,
      height: circleDiameter.value,
      borderRadius: circleDiameter.value / 2,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: wordOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* Static Outer Circle */}
      <View style={styles.outerCircle}>
        {/* Animated Inner Circle */}
        <Animated.View style={[styles.innerCircle, animatedCircleStyle]}>
          {/* Animated Text */}
          <Animated.Text style={[styles.text, animatedTextStyle]}>
            {currentWord}
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: OUTER_CIRCLE_SIZE,
    height: OUTER_CIRCLE_SIZE,
    borderRadius: OUTER_CIRCLE_SIZE / 2,
    backgroundColor: "#e0eaf9",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "#c5a9d7",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BreathingAnimation;
