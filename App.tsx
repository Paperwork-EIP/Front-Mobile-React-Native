import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Home from './src/pages/Home';
import ProcessIdea from './src/pages/ProcessIdea';
import Settings from './src/pages/Settings';
import Lexicon from './src/pages/Lexicon';
import Help from './src/pages/Help';
import QuizzPage from './src/pages/QuizzPage';
import Edit_info from './src/pages/Edit_info';
import Result from './src/pages/Result';

import Header from "./src/components/Header";

import { getColorModeFromLocalStorage } from "./src/services/Parameters";

import { themeLight, themeDark } from "./styles/app";

import "./src/i18n/i18n";

function App() {
    const [colorMode, setColorMode] = React.useState("");
    const Stack = createNativeStackNavigator();

    const getColorMode = useCallback(async () => {
        const colorMode = await getColorModeFromLocalStorage();
        if (colorMode) {
            setColorMode(colorMode);
        }
    }, []);

    useEffect(() => {
        getColorMode();
    }, [getColorMode]);

    return (
        <NavigationContainer theme={colorMode === "dark" ? themeDark : themeLight}>
            {
                colorMode ?
                    <Stack.Navigator screenOptions={{ headerShown: true, header: (props) => <Header {...props} theme={colorMode} /> }}>
                        <Stack.Screen name="Login" component={Login} initialParams={{ colorMode: colorMode }} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={Register} initialParams={{ colorMode: colorMode }} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={Home} initialParams={{ colorMode: colorMode }} />
                        <Stack.Screen name="ProcessIdea" component={ProcessIdea} initialParams={{ colorMode: colorMode }} />
                        <Stack.Screen name="Settings" component={Settings} initialParams={{ colorMode: colorMode }} />
                        <Stack.Screen name="Lexicon" component={Lexicon} initialParams={{ colorMode: colorMode }} />
                        <Stack.Screen name="Help" component={Help} initialParams={{ colorMode: colorMode }} />
                        <Stack.Screen name="Edit_info" component={Edit_info} initialParams={{ colorMode: colorMode }} />
                        <Stack.Screen name="QuizzPage" component={QuizzPage} initialParams={{ colorMode: colorMode }} />
                        <Stack.Screen name="Result" component={Result} initialParams={{ colorMode: colorMode }} />
                    </Stack.Navigator>
                    : null
            }
        </NavigationContainer>
    );
}

export default App;