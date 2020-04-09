import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
    Layout,
    Text,
    Button,
    Spinner,
} from '@ui-kitten/components';

import TextInput from '../../../components/Form/TextInput';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { loginSuccess } from '../redux/actions';
import { updateUserInfo } from '../../user/redux/actions';
import { globalStyles } from '../../../shared/globalStyles';

const Register = () => {

    const [inputs, setInputs] = useState({ displayName: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const registerHandler = async () => {
        try {
            setLoading(true);
            auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
                .then(async (user) => {
                    if (user) {
                        const currentUser = await auth().currentUser;
                        await currentUser.updateProfile({
                            displayName: inputs.displayName
                        });
                        await firestore()
                            .collection('Users')
                            .doc(currentUser.uid)
                            .set({
                                email: inputs.email,
                                displayName: inputs.displayName,
                                uid: currentUser.uid
                            });
                        dispatch(updateUserInfo({ displayName: inputs.displayName }));
                        dispatch(loginSuccess());
                        setLoading(false);
                        RootNavigation.navigate('Home');
                    }
                    else {
                        setLoading(false);
                        alert('Sign up error');
                    }
                })
                .catch(error => console.log('Error: ', error))
        }
        catch (e) {
            console.log(e)
        }

    }

    const navigateHandler = () => {
        navigation.navigate('Login');
    }

    return (
        <Layout style={globalStyles.container}>
            {
                loading ? <Spinner size='giant' /> :
                    <>
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
                            <Button
                                style={styles.button}
                                onPress={registerHandler}
                            >
                                Register</Button>
                            <Text
                                style={styles.text}
                                category='p2'
                                onPress={navigateHandler}
                            >
                                Already have account - Let's Login</Text>
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
        marginTop: 5
    }
});

export default Register;