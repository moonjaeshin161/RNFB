import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../views/authentication/screens/Login';
import Register from '../../views/authentication/screens/Register';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

export default AuthStack


