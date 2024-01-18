import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from "../screens/Calendar";
import MainMenu from "../screens/MainMenu";
import Profile from "../screens/Profile";

import { home } from "../../styles/pages/home.js";

function SwitchTabIcon(route: any, focused: boolean, color: string, size: number) {
    switch (route.name) {
        case 'Main Menu':
            return <Ionicons
                name={focused
                    ? 'home'
                    : 'home-outline'}
                size={size}
                color={color}
            />;

        case 'Calendar':
            return <Ionicons
                name={focused
                    ? 'calendar'
                    : 'calendar-outline'}
                size={size}
                color={color}
            />;

        default:
            return <Ionicons
                name={focused
                    ? 'person'
                    : 'person-outline'}
                size={size}
                color={color}
            />;
    }
}

function Home({ route }: { route: any }) {
    const Tab = createBottomTabNavigator();
    const colorMode = route.params.colorMode;

    const activeTabColor = '#FC6976';
    const inactiveTabColor = 'grey';

    return (
        <View style={home.container}>
            <Tab.Navigator
                initialRouteName="Main Menu"
                screenOptions={({ route }) => ({
                    tabBarStyle: colorMode === 'light' ? home.tabBar : home.tabBarDark,
                    headerStyle: colorMode === 'light' ? home.header : home.headerDark,
                    headerTitleStyle: colorMode === 'light' ? home.headerTitle : home.headerTitleDark,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return SwitchTabIcon(route, focused, color, size);
                    },
                    tabBarActiveTintColor: activeTabColor,
                    tabBarInactiveTintColor: inactiveTabColor,
                    headerShown: false
                })}
            >
                <Tab.Screen
                    name="Main Menu"
                    component={MainMenu}
                    initialParams={{ colorMode: colorMode }}
                />
                <Tab.Screen
                    name="Calendar"
                    component={Calendar}
                    initialParams={{ colorMode: colorMode }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    initialParams={{ colorMode: colorMode }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default Home;