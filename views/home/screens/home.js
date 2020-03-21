import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState({ email: '' });

    const navigation = useNavigation();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        navigation.navigate('Login');
    }
    return (
        <View>
            <Text>Hello {user.email}</Text>

        </View>
    )
}

export default Home
