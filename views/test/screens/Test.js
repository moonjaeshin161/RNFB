import React, { useState } from 'react'
import { Layout, Button } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import BigAvatar from '../../../components/Profile/BigAvatar';

const Test = () => {
    const [imageURI, setImageURI] = useState(null);
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
        <Layout>
            <Button onPress={pickImageHandler}>Pick Image</Button>
            <BigAvatar source={imageURI} />
            {
                console.log(imageURI)
            }
        </Layout>
    )
}

export default Test
