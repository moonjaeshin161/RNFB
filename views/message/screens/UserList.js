import React, { useEffect } from 'react';
import { Layout, Text, List, ListItem, Button } from '@ui-kitten/components';
import { globalStyles } from '../../../shared/globalStyles';
import { StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getUserList } from '../redux/action';

const UserList = () => {

    const users = useSelector(state => state.message.users);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigateChat = (index) => {
        navigation.navigate('Chat', index);
    }

    const renderItem = ({ item }) => (
        <ListItem title={`${item.displayName}`} onPress={(index) => navigateChat(index)} />
    );

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users')
            .onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach((change) => {
                    if (change.type === 'added') {
                        { console.log('ID: ', change.doc.id) }
                        dispatch(getUserList(change.doc.data()));
                    }
                })
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    return (
        <Layout style={globalStyles.container}>

            <Layout style={styles.title}>

                <Text category='h3'>Room List</Text>
            </Layout>

            <Layout style={styles.content}>
                <List
                    data={users}
                    renderItem={renderItem}
                />
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
        flex: 5,
        width: '100%',
    }

})

export default UserList;
