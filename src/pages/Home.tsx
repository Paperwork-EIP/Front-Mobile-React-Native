import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from "../screens/Calendar";
import Help from "../pages/Help";
import Lexicon from "../pages/Lexicon";
import MainMenu from "../pages/MainMenu";
import Settings from "../pages/Settings";

import { home } from "../../styles/pages/home.js";


import DisconnectButton from "../components/DisconnectButton";
import CalendarComponent from "../components/calendar/CalendarComponent";
import { getItem } from "../services/Storage";

import { calendar, brightRed } from "../../styles/screen/calendar";

function SwitchTabIcon(route: any, focused: boolean, color: string, size: number) {
    switch (route.name) {
        case 'Home':
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

        case 'Profile':
            return <Ionicons
                name={focused
                    ? 'person'
                    : 'person-outline'}
                size={size}
                color={color}
            />;

        default:
            break;
    }
}

function Home() {
    const Tab = createBottomTabNavigator();

    const activeTabColor = '#FC6976';
    const inactiveTabColor = 'grey';

    return (
        <View style={home.container}>
            <Tab.Navigator
                initialRouteName="Main Menu"
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return SwitchTabIcon(route, focused, color, size);
                    },
                    tabBarActiveTintColor: activeTabColor,
                    tabBarInactiveTintColor: inactiveTabColor,
                })}
            >
                {/* A remplacer les screens par les pages correspondantes */}
                <Tab.Screen name="Home" component={MainMenu} />
                <Tab.Screen name="Calendar" component={Calendar} />
                <Tab.Screen name="Profile" component={Settings} />
            </Tab.Navigator>
        </View>
    );
}

export default Home;