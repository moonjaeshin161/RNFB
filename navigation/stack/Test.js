import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Test from '../../views/test/screens/Test';

const Stack = createStackNavigator();

const TestStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Test' component={Test} />
        </Stack.Navigator>
    )
}

export default TestStack
