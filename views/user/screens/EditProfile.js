import React, { useState } from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import TextInput from '../../../components/Form/TextInput'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const EditProfile = ({ route }) => {
    const user = route.params;
    const [inputs, setInputs] = useState();
    const navigation = useNavigation();

    const editHandler = async () => {
        console.log(inputs)
        console.log(auth().currentUser);
        await auth().currentUser.updateProfile(inputs);
        navigation.goBack();
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

            <Button onPress={editHandler}>Edit</Button>

        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default EditProfile
