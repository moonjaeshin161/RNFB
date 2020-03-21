import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../views/user/screens/profile';

const Stack = createStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
    )
}

export default UserStack
