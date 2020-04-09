import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet } from 'react-native';

import * as RootNavigation from '../../../navigation/RootNavigation';

import {
    Layout,
    Text,
    Button,
    Spinner
} from '@ui-kitten/components';

import TextInput from '../../../components/Form/TextInput';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../shared/globalStyles';

const Login = () => {

    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const loginHandler = async () => {
        try {
            setLoading(true);
            await auth().signInWithEmailAndPassword(inputs.email, inputs.password);
            dispatch(loginSuccess());
            setLoading(false);
            RootNavigation.navigate('Home');
        } catch (e) {
            console.log(e.message);
            setLoading(false);
        }
    }

    const navigateHandler = () => {
        navigation.navigate('Register');
    }

    return (
        <Layout style={globalStyles.container}>
            {
                loading ? <Spinner size='giant' /> :
                    <>
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
                            <Button
                                style={styles.button}
                                onPress={loginHandler}
                            >
                                Login</Button>
                            <Text
                                style={styles.text}
                                category='p2'
                                onPress={navigateHandler}
                            >
                                Didn't have account - Sign Up for now
                        </Text>
                        </Layout>
                    </>
            }
        </Layout>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: 4,
        alignItems: 'center',
    },
    button: {
        marginTop: 5
    },
    text: {
        marginTop: 10
    },
});

export default Login;