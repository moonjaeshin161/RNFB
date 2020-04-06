import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../views/message/screens/ChatScreen';

const Stack = createStackNavigator();

const MessageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default MessageStack;


