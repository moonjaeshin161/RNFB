import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet } from 'react-native';

import * as RootNavigation from '../../../navigation/RootNavigation';

import {
    Layout,
    Text,
    Button,
} from '@ui-kitten/components';

import TextInput from '../../../components/Form/TextInput';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions';

const Login = () => {

    const [inputs, setInputs] = useState({ email: '', password: '' });

    const dispatch = useDispatch();

    const loginHandler = async () => {
        try {
            await auth().signInWithEmailAndPassword(inputs.email, inputs.password);
            dispatch(loginSuccess());
            RootNavigation.navigate('Home');
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Layout style={styles.container}>

            <Layout style={styles.layout}>
                <Text category='h3'>Login Screen</Text>
            </Layout>

            <Layout style={styles.form}>
                <TextInput
                    placeholder='Your Email'
                    value={inputs.email}
                    name='email'
                    setInputs={setInputs}
                    inputs={inputs}
                />
                <TextInput
                    placeholder='Password'
                    value={inputs.password}
                    name='password'
                    setInputs={setInputs}
                    inputs={inputs}
                />
                <Button onPress={loginHandler}>Login</Button>
            </Layout>

        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: 4,
        alignItems: 'center',
    }
});

export default Login;