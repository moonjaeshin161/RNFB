import React, { useState } from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../redux/actions';
import ImagePicker from 'react-native-image-picker';

import TextInput from '../../../components/Form/TextInput'
import BigAvatar from '../../../components/Profile/BigAvatar';

const EditProfile = ({ route }) => {
    const user = route.params;

    const [inputs, setInputs] = useState();
    const [avatarSource, setAvatarSource] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const editHandler = async () => {
        const currentUser = auth().currentUser;
        currentUser.updateProfile(inputs)
            .then(() => {
                dispatch(updateUserInfo(inputs));
                navigation.goBack();
            })
    }

    const selectImageHandler = async () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setAvatarSource(response.uri);
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
                avatarSource &&
                <BigAvatar
                    source={{ uri: avatarSource }}
                />
            }

            <Button onPress={editHandler}>Edit</Button>
            <Button onPress={selectImageHandler}>Select Image</Button>

        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default EditProfile
