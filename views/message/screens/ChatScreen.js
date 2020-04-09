import React, { useState, useEffect } from 'react'
import { Layout, Input, Button } from '@ui-kitten/components'
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({ route }) => {

    const index = route.params;
    const users = useSelector(state => state.message.users);
    const sender = useSelector(state => state.user.user);
    const receiver = users[index];
    const messageCollection = firestore().collection('Messages');

    const [message, setMessage] = useState('');

    const changeHandler = (value) => {
        setMessage(value);
    }

    const sendHandler = () => {
        if (message.length > 0) {
            console.log('Sender UID', sender.uid);
            messageCollection
                .doc(sender.uid)
                .collection(receiver.uid)
                .add({
                    sender: sender.uid,
                    receiver: receiver.uid,
                    content: message,
                    createdAt: firestore.Timestamp.now()
                });
            setMessage('');
        }
    }

    useEffect(() => {
        const subscriber = messageCollection
            .onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach((change) => {
                    if (change.type === 'added') {
                        { console.log('Message: ', change.doc.data().content) }
                    }
                })
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    return (
        <Layout>

            <Layout style={styles.row}>
                <Input
                    onChangeText={changeHandler}
                    value={message}
                    style={styles.input}
                />
                <Button onPress={sendHandler}>Send</Button>
            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    input: {
        width: 300,
        marginHorizontal: 10
    }
})

export default ChatScreen
