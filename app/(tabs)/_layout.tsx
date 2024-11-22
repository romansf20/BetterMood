import React, { forwardRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';

// Import screens
import DashboardScreen from './index';
import GrowScreen from './grow';
import ProfileScreen from './profile';
import CheckinScreen from './check';

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const AppLayout = forwardRef((props, ref) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 0, // Adjust to align tabs at the bottom
                        backgroundColor: '#f8f8f8', // Default tab background
                        borderTopWidth: 1,
                        borderTopColor: '#ddd',
                        elevation: 0,
                    },
                    tabBarActiveTintColor: '#6200ee',
                    tabBarInactiveTintColor: '#a1a1a1',
                    headerShown: true, // Show the header
                }}
            >
                <Tab.Screen 
                    name="Dashboard" 
                    component={DashboardScreen} 
                    options={{
                        tabBarLabel: 'Dash',
                        header: () => <CustomHeader title="Dashboard" />, // Custom header
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="bar-chart" color={color} size={size} />
                        ),
												animation: 'shift', // Apply shift animation here
                    }}
                />
                <Tab.Screen 
                    name="Check-in" 
                    component={CheckinScreen} 
                    options={{
                        tabBarLabel: 'Check-in',
                        header: () => <CustomHeader title="Check-in" />, // Custom header
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="how-to-reg" color={color} size={size} />
                        ),
												animation: 'shift', // Apply shift animation here
                    }}
                />
                <Tab.Screen 
                    name="Grow" 
                    component={GrowScreen} 
                    options={{
                        tabBarLabel: 'Grow',
                        header: () => <CustomHeader title="Grow" />, // Custom header
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="trending-up" color={color} size={size} />
                        ),
												animation: 'shift', // Apply shift animation here
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        tabBarLabel: 'Profile',
                        header: () => <CustomHeader title="Profile" />, // Custom header
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person" color={color} size={size} />
                        ),
												animation: 'shift', // Apply shift animation here
                    }}
                />
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
        elevation: 4, // Shadow for Android
        shadowOpacity: 0.2, // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

AppLayout.displayName = 'AppLayout';
export default AppLayout;
