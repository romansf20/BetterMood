import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const GoogleImagePreview = ({ images, categoryTitle, onClose, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [imageLayout, setImageLayout] = useState({ width: 0, height: 0, top: 0, left: 0 }); // To store actual image layout

    const handleSwipeRight = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleSwipeLeft = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Capture the actual dimensions and position of the image after it renders
    const handleImageLayout = (event) => {
        const { width, height, x: left, y: top } = event.nativeEvent.layout;
        setImageLayout({ width, height, top, left });
    };

    return (
        <Modal visible={true} transparent={true}>
            <GestureHandlerRootView style={styles.container}>
                <PanGestureHandler
                    onGestureEvent={(event) => {
                        if (event.nativeEvent.translationX > 50) handleSwipeRight();
                        if (event.nativeEvent.translationX < -50) handleSwipeLeft();
                    }}>
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: images[currentIndex] }}
                                style={styles.image}
                                resizeMode="contain"
                                onLayout={handleImageLayout} // Get actual image layout dimensions
                            />
                            {/* Overlay "X" button in top-right corner of the visible part of the image */}
                            <TouchableOpacity
                                style={[
                                    styles.closeButton,
                                    {
                                        top: imageLayout.top + 10, // Top offset based on image's actual position
                                        left: imageLayout.left + imageLayout.width - 50, // Adjust to position the button correctly on the right
                                    },
                                ]}
                                onPress={onClose}
                            >
                                <Text style={styles.closeButtonText}>{"x"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: '90%',
        height: '80%',
        position: 'relative', // To allow absolute positioning of the button inside this container
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent tint
        borderRadius: 20,     // Circle shape
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,           // Ensure it's above the image
    },
    closeButtonText: {
        fontSize: 24,
        color: 'white',
    },
});

export default GoogleImagePreview;
