import React, { forwardRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';

// Import screens
import DashboardScreen from './index';
import GrowScreen from './grow';
import ProfileScreen from './profile';
import CheckinScreen from './check';

const SELECTED_STATE_COLOR = "#54487f"; // TODO: this should live in a Tokens file from Design System

const Tab = createMaterialTopTabNavigator();

const CustomHeader = ({ title }: { title: string }) => (
    <View>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerLine} />
    </View>
);

// Wrapper Component for Screen Content and Header
const ScreenWithHeader = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.screenContainer}>
        <CustomHeader title={title} />
        <View style={styles.screenContent}>
            {children}
        </View>
    </View>
);

const AppLayout = forwardRef((props, ref) => {
	
	const [resetAnimation, setResetAnimation] = useState(false);

    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarPosition="bottom" // Position the tab bar at the bottom
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#f8f8f8',
                        borderTopWidth: 1,
                        borderTopColor: '#ddd',
                    },
                    tabBarActiveTintColor: SELECTED_STATE_COLOR,
                    tabBarInactiveTintColor: '#a1a1a1',
                    tabBarIndicatorStyle: {
                        backgroundColor: SELECTED_STATE_COLOR,
                        height: 2,
                        top: 0, // Move the indicator to the top of the navigation bar
                    },
                }}
            >
                <Tab.Screen
                    name="Dashboard"
                    options={{
                        tabBarLabel: 'Dash',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="bar-chart" color={color} size={size} />
                        ),
                    }}
                >
                    {() => <ScreenWithHeader title="Dashboard"><DashboardScreen /></ScreenWithHeader>}
                </Tab.Screen>
                <Tab.Screen
                    name="Check-in"
                    options={{
                        tabBarLabel: 'Check-in',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="how-to-reg" color={color} size={size} />
                        ),
                    }}
                >
                    {() => <ScreenWithHeader title="Check-in"><CheckinScreen /></ScreenWithHeader>}
                </Tab.Screen>
                <Tab.Screen
                    name="Grow"
                    options={{
                        tabBarLabel: 'Grow',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="trending-up" color={color} size={size} />
                        ),
                    }}
                >
                    {() => <ScreenWithHeader title="Grow"><GrowScreen resetAnimation={resetAnimation}/></ScreenWithHeader>}
                </Tab.Screen>
                <Tab.Screen
                    name="Profile"
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person" color={color} size={size} />
                        ),
                    }}
                >
                    {() => <ScreenWithHeader title="Profile"><ProfileScreen /></ScreenWithHeader>}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
});

const styles = StyleSheet.create({
    header: {
        height: 56,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 4, // Shadow for Android
        // shadowOpacity: 0.2, // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    headerLine: {
        height: 1,
        backgroundColor: '#ddd',
        width: '100%',
    },
    screenContainer: {
        flex: 1,
        backgroundColor: '#f1f1f5', // Background color for each screen
    },
    screenContent: {
        flex: 1,
        padding: 16, // Optional: Padding for the screen content
    },
});

AppLayout.displayName = 'AppLayout';
export default AppLayout;
