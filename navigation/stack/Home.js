import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../views/home/screens/home';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
}

export default HomeStack
