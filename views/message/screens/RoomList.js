import React, { useState, useEffect } from 'react';
import { Layout, Text, List, ListItem, Button } from '@ui-kitten/components';
import { globalStyles } from '../../../shared/globalStyles';
import { StyleSheet } from 'react-native';
import TextInput from '../../../components/Form/TextInput';

import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { getRoomList } from '../redux/action';

const RoomList = () => {

    const [inputs, setInputs] = useState({ roomName: '' });
    const rooms = useSelector(state => state.message.rooms);
    const dispatch = useDispatch();

    const renderItem = ({ item }) => (
        <ListItem title={`${item.name}`} />
    );

    const addHandler = () => {
        if (inputs.roomName !== '') {
            firestore()
                .collection('Rooms')
                .add({
                    name: inputs.roomName
                })
        }
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('Rooms')
            .onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach((change) => {
                    if (change.type === 'added') {
                        { console.log('ID: ', change.doc.id) }
                        dispatch(getRoomList(change.doc.data()));
                    }
                })
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [rooms.id]);

    return (
        <Layout style={globalStyles.container}>

            <Layout style={styles.title}>
                <Text category='h3'>Room List</Text>
                <Button onPress={addHandler}>Add</Button>
                <TextInput
                    value={inputs.roomName}
                    setInputs={setInputs}
                    inputs={inputs}
                    name='roomName'
                />
            </Layout>

            <Layout style={styles.content}>
                <List
                    data={rooms}
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

export default RoomList
