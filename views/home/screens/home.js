import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

import * as RootNavigation from '../../../navigation/RootNavigation';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../user/redux/actions';

const Home = () => {
    const [user, setUser] = useState({ email: '' });
    const dispatch = useDispatch();

    function onAuthStateChanged(user) {
        setUser(user);
        dispatch(getUserInfo(user));
    }
    useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged);
    }, []);

    if (!user) {
        RootNavigation.navigate('Login');
    }
    return (
        <View>
            <Text>Hello {user.email}</Text>

        </View>
    )
}

export default Home
