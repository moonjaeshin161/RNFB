import React, { useState } from 'react'
import { Layout, Text, Button, Spinner } from '@ui-kitten/components'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../redux/actions';
import ImagePicker from 'react-native-image-picker';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import TextInput from '../../../components/Form/TextInput'
import BigAvatar from '../../../components/Profile/BigAvatar';
import { globalStyles } from '../../../shared/globalStyles';

const EditProfile = () => {
    const user = useSelector(state => state.user.user);

    const [inputs, setInputs] = useState({ displayName: user.displayName });
    const [imageURI, setImageURI] = useState(user.avatar ? { uri: user.avatar } : require('../../../asserts/images/default-avatar.png'));
    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const editHandler = async () => {

        const currentUser = auth().currentUser;

        if (isChanged) {
            setIsLoading(true);
            const fileExtension = await imageURI.uri.split('.').pop();
            const fileName = `${currentUser.uid}.${fileExtension}`;

            const storageRef = storage().ref(`users/avatar/${fileName}`);

            storageRef.putFile(imageURI.uri)
                .on(
                    storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        console.log('Snapshot: ', snapshot.state);

                        if (snapshot.state === storage.TaskState.SUCCESS) {
                            console.log('Success')
                        }
                    },
                    error => {
                        unsubscribe();
                        console.log('Image upload error: ', error.toString());
                    },
                    () => {
                        storageRef.getDownloadURL()
                            .then(downloadURL => {
                                console.log('File available at: ', downloadURL);
                                currentUser.updateProfile({
                                    displayName: inputs.displayName,
                                    photoURL: downloadURL
                                });
                                dispatch(updateUserInfo({ displayName: inputs.displayName, avatar: downloadURL }));
                                firestore()
                                    .collection('Users')
                                    .doc(currentUser.uid)
                                    .update({
                                        avatar: downloadURL,
                                        displayName: inputs.displayName
                                    })
                            })
                            .then(() => {
                                setIsLoading(false);
                                navigation.goBack();
                            })
                    }
                );
        }
        else {
            setIsLoading(true);
            currentUser.updateProfile({
                displayName: inputs.displayName,
            }).then(() => {
                dispatch(updateUserInfo({ displayName: inputs.displayName }));
                firestore()
                    .collection('Users')
                    .doc(currentUser.uid)
                    .update({
                        displayName: inputs.displayName
                    }).then(() => {
                        setIsLoading(false);
                        navigation.goBack();
                    })
            })
        }
    }

    const pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: 'Image upload', maxHeight: 400, maxWidth: 300 }
            , (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    setImageURI({ uri: response.uri });
                    setIsChanged(true);
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                }
            });
    }

    return (
        <Layout style={globalStyles.container}>
            {
                isLoading ? <Spinner size='giant' /> :
                    <>
                        <Layout style={styles.title}>
                            <Text category='h3'>Profile Editing</Text>
                        </Layout>
                        <Layout style={styles.content}>
                            <Layout>
                                <TouchableOpacity onPress={pickImageHandler}>
                                    <BigAvatar source={imageURI} />
                                </TouchableOpacity>
                            </Layout>
                            <Layout style={styles.row}>
                                <Text
                                    style={styles.label}
                                    category='s1'
                                >
                                    Displayname</Text>
                                <TextInput
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    name='displayName'
                                    value={inputs.displayName}
                                />
                            </Layout>


                        </Layout>
                        <Layout style={styles.footer}>
                            <Button onPress={editHandler}>Edit</Button>
                        </Layout>
                    </>
            }
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
        alignItems: "center"
    },
    row: {
        flex: 1,
        width: 350,
    },
    label: {
        marginLeft: 15,
        marginVertical: 10
    },
    footer: {
        flex: 3,
        marginTop: 10
    }
})

export default EditProfile
