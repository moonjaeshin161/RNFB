import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../views/message/screens/ChatScreen';
import UserList from '../../views/message/screens/UserList';

const Stack = createStackNavigator();

const MessageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default MessageStack;


