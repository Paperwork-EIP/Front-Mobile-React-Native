import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Home from './src/pages/Home';
import ProcessIdea from './src/pages/ProcessIdea';
import Settings from './src/pages/Settings';
import MainMenu from './src/pages/MainMenu';
import Lexicon from './src/pages/Lexicon';
import Help from './src/pages/Help';

import "./src/i18n/i18n";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ProcessIdea" component={ProcessIdea} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="MainMenu" component={MainMenu} />
                <Stack.Screen name="Lexicon" component={Lexicon} />
                <Stack.Screen name="Help" component={Help} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;