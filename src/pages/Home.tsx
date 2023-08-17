import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from "../screens/Calendar";

import { home } from "../../styles/pages/home.js";

function Home() {
    const Tab = createBottomTabNavigator();

    const activeTabColor = '#FC6976';
    const inactiveTabColor = 'grey';

    return (
        <View style={home.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
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
                    },
                    tabBarActiveTintColor: activeTabColor,
                    tabBarInactiveTintColor: inactiveTabColor,
                })}
            >
                {/* A remplacer les screens par les pages correspondantes */}
                <Tab.Screen name="Home" component={Calendar} />
                <Tab.Screen name="Calendar" component={Calendar} />
                <Tab.Screen name="Profile" component={Calendar} />
            </Tab.Navigator>
        </View>
    );
}

export default Home;