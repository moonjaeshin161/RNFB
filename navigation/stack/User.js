import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../views/user/screens/Profile';
import EditProfile from '../../views/user/screens/EditProfile';

const Stack = createStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Edit Profile' component={EditProfile} />
        </Stack.Navigator>
    )
}

export default UserStack
