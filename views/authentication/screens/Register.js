import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {
    Layout,
    Text,
    Button,
} from '@ui-kitten/components';

import TextInput from '../../../components/Form/TextInput';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions';
import { getUserInfo } from '../../user/redux/actions';

const Register = () => {

    const [inputs, setInputs] = useState({ displayName: '', email: '', password: '' });

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const registerHandler = async () => {
        try {
            auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
                .then(() => {
                    const user = auth().currentUser;
                    if (user) {
                        user.updateProfile({
                            displayName: inputs.displayName
                        })
                            .then(() => {
                                console.log(user);
                                dispatch(loginSuccess());
                                dispatch(getUserInfo(user));
                                RootNavigation.navigate('Home');
                            })

                    }
                })


        } catch (e) {
            console.log(e.message);
        }
    }

    const navigateHandler = () => {
        navigation.navigate('Login');
    }

    return (
        <Layout style={styles.container}>

            <Layout style={styles.layout}>
                <Text category='h3'>Register Screen</Text>
            </Layout>

            <Layout style={styles.form}>
                <TextInput
                    placeholder='Your display name'
                    value={inputs.displayName}
                    name='displayName'
                    setInputs={setInputs}
                    inputs={inputs}
                /><TextInput
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
                <Button onPress={registerHandler}>Register</Button>
                <Text category='p2' onPress={navigateHandler}>Already have account - Let's Login</Text>
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

export default Register;