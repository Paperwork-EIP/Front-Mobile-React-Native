import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from "../screens/Calendar";

import { home } from "../../styles/pages/home.js";
import AddButton from '../components/AddButton';

function SwitchTabIcon(route: any, focused: boolean, color: string, size: number) {
    switch (route.name) {
        case 'MainMenu':
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
                initialRouteName="MainMenu"
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
                <Tab.Screen name="MainMenu" component={Calendar} />
                <Tab.Screen
                    name="Calendar"
                    component={Calendar}
                    options={{
                        headerRight: (props: any) =>
                            <AddButton
                                onPress={() => console.log("OK")}
                            />,
                    }}
                />
                <Tab.Screen name="Profile" component={Calendar} />
            </Tab.Navigator>
        </View>
    );
}

export default Home;