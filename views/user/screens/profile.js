import React, { useState, useEffect } from 'react'
import { Layout, Text, Button } from '@ui-kitten/components';
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../shared/globalStyles';
import BigAvatar from '../../../components/Profile/BigAvatar';

const Profile = () => {
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();
    const [avatar, setAvatar] = useState(user.avatar ? { uri: user.avatar } : require('../../../asserts/images/default-avatar.png'));

    const editHandler = () => {
        navigation.navigate('Edit Profile');
    }

    useEffect(() => {
        if (user.avatar) {
            setAvatar({ uri: user.avatar })
        }
    }, [user]);

    return (
        <Layout style={globalStyles.container}>
            {console.log('Profile: ', user)}
            <Layout style={styles.title}>
                <Text category='h3'>{`${user.displayName}'s Profile`}</Text>
            </Layout>
            <Layout style={styles.content}>
                <Layout style={styles.info}>
                    <BigAvatar source={avatar} />
                    <Text category='s1'>Displayname: {user.displayName}</Text>
                    <Text category='s1'>Email: {user.email}</Text>
                </Layout>

            </Layout>
            <Layout style={styles.footer}>
                <Button onPress={editHandler}>Edit</Button>
            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        flex: 6,
    },
    info: {
        flex: 1,
        width: 350,
        alignItems: 'center',
    },
    footer: {
        flex: 3,
        marginTop: 10
    }
})

export default Profile;
