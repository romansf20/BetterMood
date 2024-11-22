import React, { forwardRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Example icon library
import { Header, getHeaderTitle } from '@react-navigation/elements';


// Import screens
import DashboardScreen from './index';
import GrowScreen from './grow';
import ProfileScreen from './profile';
import CheckinScreen from './check';

const Tab = createBottomTabNavigator();

const AppLayout = forwardRef((props, ref) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
									// header: ({ options, route, back }) => (
									// 	<Header
									// 		{...options}
									// 		back={back}
									// 		title={getHeaderTitle(options, route.name)}
									// 	/>
									// ),
                    tabBarStyle: {
                        position: 'absolute', // Make the tab bar positionable
                        bottom: -36, // Shift the tab bar down by 30 pixels
                        backgroundColor: 'transparent', // Remove background
                        borderTopWidth: 1, // Add a horizontal line
                        borderTopColor: '#ddd', // Line color
                        elevation: 0, // Remove shadow on Android
                    },
										// headerStyle: {
										// },
                    tabBarActiveTintColor: '#6200ee', // Active tab label color
                    tabBarInactiveTintColor: '#a1a1a1', // Inactive tab label color
                    // headerShown: true, // Hide the header if not needed
                }}
            >
                <Tab.Screen 
                    name="Dashboard" 
                    component={DashboardScreen} 
                    options={{
											// title: 'Awesome app',
                        tabBarLabel: 'Dash',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="bar-chart" color={color} size={size} />
                        ),
                    }} 
                />
                <Tab.Screen 
                    name="Check-in" 
                    component={CheckinScreen} 
                    options={{
                        tabBarLabel: 'Check-in',
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

AppLayout.displayName = 'AppLayout';
export default AppLayout;
