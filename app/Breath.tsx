import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

// Animation duration and size constants
const WORD_FADE_IN_DURATION = 400;
const WORD_FADE_OUT_DURATION = 200;
const INHALE_DURATION = 4000;
const EXHALE_DURATION = 4000;
const HOLD_DURATION1 = 4000;
const START_DELAY = 1000;

// Circle size constants
const OUTER_CIRCLE_SIZE = 190;
const INNER_CIRCLE_SIZE_INITIAL = 106;

const BreathingAnimation = ({ activeTab = "Calm" }) => {
  const isFocused = useIsFocused();
  const circleDiameter = useSharedValue(INNER_CIRCLE_SIZE_INITIAL); // Initial size of the inner circle
  const wordOpacity = useSharedValue(0); // Word opacity
  const [currentWord, setCurrentWord] = useState("");
  const timeoutRefs = useRef([]); // Store timers

  // Clear all active timers
  const clearAllTimers = () => {
    timeoutRefs.current.forEach((id) => clearTimeout(id));
    timeoutRefs.current = [];
  };

  useEffect(() => {
    // Function to reset animations
    const resetAnimations = () => {
      cancelAnimation(circleDiameter);
      cancelAnimation(wordOpacity);
      circleDiameter.value = INNER_CIRCLE_SIZE_INITIAL;
      wordOpacity.value = 0;
      setCurrentWord(""); // Reset displayed word
      clearAllTimers();
    };

    // Start animation sequence
    const startAnimation = async () => {
      await new Promise((resolve) => {
        const id = setTimeout(resolve, START_DELAY);
        timeoutRefs.current.push(id);
      });

      while (isFocused) {
        // "Inhale" phase
        setCurrentWord("Inhale");
        wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, WORD_FADE_IN_DURATION);
          timeoutRefs.current.push(id);
        });

        circleDiameter.value = withTiming(OUTER_CIRCLE_SIZE, {
          duration: INHALE_DURATION,
          easing: Easing.linear,
        });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, INHALE_DURATION);
          timeoutRefs.current.push(id);
        });

        wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, WORD_FADE_OUT_DURATION);
          timeoutRefs.current.push(id);
        });

        // "Hold" phase
        setCurrentWord("Hold");
        wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, WORD_FADE_IN_DURATION);
          timeoutRefs.current.push(id);
        });

        await new Promise((resolve) => {
          const id = setTimeout(resolve, HOLD_DURATION1);
          timeoutRefs.current.push(id);
        });

        wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, WORD_FADE_OUT_DURATION);
          timeoutRefs.current.push(id);
        });

        // "Exhale" phase
        setCurrentWord("Exhale");
        wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, WORD_FADE_IN_DURATION);
          timeoutRefs.current.push(id);
        });

        circleDiameter.value = withTiming(INNER_CIRCLE_SIZE_INITIAL, {
          duration: EXHALE_DURATION,
          easing: Easing.linear,
        });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, EXHALE_DURATION);
          timeoutRefs.current.push(id);
        });

        wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION });
        await new Promise((resolve) => {
          const id = setTimeout(resolve, WORD_FADE_OUT_DURATION);
          timeoutRefs.current.push(id);
        });
      }
    };

    resetAnimations(); // Reset animations on mount

    if (isFocused) {
      if (activeTab === "Calm") {
        setCurrentWord("4-4-4-4");
      } else if (activeTab === "Sleep") {
        setCurrentWord("4-7-8");
      }

      wordOpacity.value = withTiming(1, { duration: WORD_FADE_IN_DURATION });

      const id = setTimeout(() => {
        wordOpacity.value = withTiming(0, { duration: WORD_FADE_OUT_DURATION });
        const innerId = setTimeout(() => {
          setCurrentWord("");
          startAnimation();
        }, WORD_FADE_OUT_DURATION);
        timeoutRefs.current.push(innerId);
      }, 2000);
      timeoutRefs.current.push(id);
    }

    return () => {
      resetAnimations(); // Cleanup on unmount or dependency change
    };
  }, [isFocused, activeTab]);

  // Animated styles
  const animatedCircleStyle = useAnimatedStyle(() => ({
    width: circleDiameter.value,
    height: circleDiameter.value,
    borderRadius: circleDiameter.value / 2,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: wordOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <Animated.View style={[styles.innerCircle, animatedCircleStyle]}>
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
