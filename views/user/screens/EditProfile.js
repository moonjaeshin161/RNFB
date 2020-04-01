import React, { useState } from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'
import { StyleSheet, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../redux/actions';
import ImagePicker from 'react-native-image-picker';
import { uploadPhoto } from '../../../firebase/service';

import TextInput from '../../../components/Form/TextInput'
import BigAvatar from '../../../components/Profile/BigAvatar';
import { globalStyles } from '../../../shared/globalStyles';

const EditProfile = () => {
    const user = useSelector(state => state.user.user);

    const [inputs, setInputs] = useState({ displayName: '' });
    const [imageURI, setImageURI] = useState(require('../../../asserts/images/default-avatar.png'));
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const editHandler = async () => {
        const currentUser = auth().currentUser;
        currentUser.updateProfile({ displayName: inputs.displayName, avatar: imageURI })
            .then(() => {
                uploadPhoto(imageURI.uri);
                dispatch(updateUserInfo({ displayName: inputs.displayName, avatar: imageURI }));
                navigation.goBack();
            })
    }

    const pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: 'Image upload', maxHeight: 800, maxWidth: 600 }
            , (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    setImageURI({ uri: response.uri });
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                }
            });
    }

    return (
        <Layout style={globalStyles.container}>
            {console.log('Edit Profile', user)}
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
                        placeholder={user.displayName}
                        inputs={inputs}
                        setInputs={setInputs}
                        name='displayName'
                    />
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
