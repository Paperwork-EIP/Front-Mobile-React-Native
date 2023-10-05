import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from "../screens/Calendar";
import MainMenu from "../screens/MainMenu";
import Profile from "../screens/Profile";

import { home } from "../../styles/pages/home.js";
import { profile } from "../../styles/screen/profile.js";

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

function Home({ navigation }: { navigation: any }) {
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
                    headerRight: () => (
                        <TouchableOpacity style={profile.settingsButton} onPress={() => { navigation.navigate('Settings') }}>
                            <Ionicons name={'settings-sharp'} size={24} color={'black'} />
                        </TouchableOpacity>
                    ),
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={MainMenu}
                />
                <Tab.Screen
                    name="Calendar"
                    component={Calendar}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                />
            </Tab.Navigator>
        </View>
    );
}

export default Home;