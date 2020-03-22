import React from 'react'
import { Layout, Text, Button } from '@ui-kitten/components';
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();

    const editHandler = () => {
        navigation.navigate('Edit Profile', user)
    }

    return (
        <Layout style={styles.container}>
            <Text category='h3'>{`${user.displayName}'s profile`}</Text>
            <Button onPress={editHandler}>Edit</Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Profile;
