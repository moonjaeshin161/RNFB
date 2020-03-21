import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Setting from '../../views/home/screens/setting';

const Stack = createStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Setting' component={Setting} />
        </Stack.Navigator>
    )
}

export default SettingStack
