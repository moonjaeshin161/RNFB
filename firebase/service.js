import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const uploadPhoto = async (uri) => {
    const fileExtension = await uri.split('.').pop();
    console.log('EXT: ', fileExtension);
    console.log('UID: ', uid);
    const fileName = `${uid}.${fileExtension}`;
    console.log('Filename: ', fileName);

    const storageRef = storage().ref(`users/avatar/${fileName}`);

    storageRef.putFile(uri)
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
                        firestore()
                            .collection('users')
                            .doc(auth().currentUser.uid)
                            .update({
                                avatar: downloadURL
                            })
                    })
            }
        )
}
