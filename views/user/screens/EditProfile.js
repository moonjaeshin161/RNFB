import React, { useState } from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../redux/actions';
import ImagePicker from 'react-native-image-picker';
import { uploadPhoto } from '../../../firebase/service';

import TextInput from '../../../components/Form/TextInput'
import BigAvatar from '../../../components/Profile/BigAvatar';

const EditProfile = ({ route }) => {
    const user = route.params;

    const [inputs, setInputs] = useState({ displayName: '' });
    const [imageURI, setImageURI] = useState(null);
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
        <Layout style={styles.container}>
            {console.log('Edit Profile', user)}
            <Text category='h3'>Edit Profile</Text>
            <TextInput
                placeholder={user.displayName}
                inputs={inputs}
                setInputs={setInputs}
                name='displayName'
            />

            {
                imageURI &&
                <BigAvatar
                    source={imageURI}
                />
            }

            <Button onPress={editHandler}>Edit</Button>
            <Button onPress={pickImageHandler}>Select Image</Button>

        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default EditProfile
