import React from 'react';
import { Button } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import * as RootNavigation from '../../../navigation/RootNavigation';

import { logOutSuccess } from '../../authentication/redux/actions';

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
        <Button onPress={signOutHandler}>Sign Out</Button>
    )
}

export default Setting;