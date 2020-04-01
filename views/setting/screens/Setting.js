import React from 'react';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import * as RootNavigation from '../../../navigation/RootNavigation';

import { logOutSuccess } from '../../authentication/redux/actions';
import { Layout, Button } from '@ui-kitten/components';
import { globalStyles } from '../../../shared/globalStyles';

const Setting = () => {
    const dispatch = useDispatch();
    const signOutHandler = async () => {
        auth().signOut().then(function () {
            dispatch(logOutSuccess());
            RootNavigation.navigate('Login')
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <Layout style={globalStyles.container}>
            <Button onPress={signOutHandler}>Sign Out</Button>
        </Layout>
    )
}

export default Setting;