import React from "react";
import { View, Text, Button } from "react-native";

import { login } from "../../styles/styles";

function Login({ navigation }) {
    return (
        <View style={login.container}>
            <Text>Login</Text>
            <Button
                title="No account? Register here !"
                onPress={
                    () => navigation.navigate('Register')
                }
            />
        </View>
    );
};

export default Login;