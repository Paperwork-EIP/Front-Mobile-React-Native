import React from 'react';
import { View, Text, Button } from 'react-native';

import { register } from '../../styles/styles';

function Register({ navigation }) {
    return (
        <View style={register.container}>
            <Text>Register</Text>
            <Button
                title="Already have an account ? Login here !"
                onPress={
                    () => navigation.navigate('Login')
                }
            />
        </View>
    )
};

export default Register;