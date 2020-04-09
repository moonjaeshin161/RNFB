import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import * as RootNavigation from '../../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../user/redux/actions';
import { Layout, Text } from '@ui-kitten/components';
import { globalStyles } from '../../../shared/globalStyles';

const Home = () => {
    const user = useSelector(state => state.user.user);
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch();

    function onAuthStateChanged(user) {
        dispatch(setUserInfo({ email: user.email, displayName: user.displayName, avatar: user.photoURL, uid: user.uid }));
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (!user) {
        RootNavigation.navigate('Login');
    }

    if (initializing) return null;

    return (
        <Layout style={globalStyles.container}>
            <Text>Welcome {user.displayName}</Text>
        </Layout>
    )
}

export default Home
