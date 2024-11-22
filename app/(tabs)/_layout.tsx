import React, { forwardRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import screens
import DashboardScreen from './index';
import GrowScreen from './grow';
import ProfileScreen from './profile';

const Tab = createMaterialTopTabNavigator();

const AppLayout = forwardRef((props, ref) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { backgroundColor: '#6200ee' }, // Customize tab bar color
                    tabBarIndicatorStyle: { backgroundColor: 'white' }, // Indicator color
                    swipeEnabled: true, // Enables swipe gestures for tabs
                    animationEnabled: true, // Enables animations for transitions
                }}
            >
                <Tab.Screen 
                    name="Dashboard" 
                    component={DashboardScreen} 
                    options={{
                        tabBarLabel: 'Dash',
                    }} 
                />
                <Tab.Screen 
                    name="Grow" 
                    component={GrowScreen} 
                    options={{
                        tabBarLabel: 'Grow',
                    }} 
                />
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        tabBarLabel: 'Profile',
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
});

export default AppLayout;
