import React from 'react';
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
import Result  from './src/pages/Result';
import Header from "./src/components/Header";

import "./src/i18n/i18n";
import AsyncStorage from '@react-native-async-storage/async-storage'

function App() {

    const Stack = createNativeStackNavigator();

    const [isDarkMode, setIsDarkMode] = useState(false);

    const loadThemePreference = async () => {
        try {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme) {
                setIsDarkMode(storedTheme === 'dark');
                console.log("isDarkMode = " + isDarkMode);
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    useEffect(() => {
        loadThemePreference();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true, header: (props) => <Header {...props} isDarkMode={isDarkMode} /> }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ProcessIdea" component={ProcessIdea} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Lexicon" component={Lexicon} />
                <Stack.Screen name="Help" component={Help} />
                <Stack.Screen name="Edit_info" component={Edit_info} />
                <Stack.Screen name="QuizzPage" component={QuizzPage} />
                <Stack.Screen name="Result" component={Result} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;