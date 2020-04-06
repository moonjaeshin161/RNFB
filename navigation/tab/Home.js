import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../stack/Home';
import SettingStack from '../stack/Setting';
import UserStack from '../stack/User';
import MessageStack from '../stack/Message';

const Tab = createBottomTabNavigator();
const HomeTab = () => (
    <Tab.Navigator >
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='User' component={UserStack} />
        <Tab.Screen name='Message' component={MessageStack} />
        <Tab.Screen name='Setting' component={SettingStack} />
    </Tab.Navigator>
)

export default HomeTab;