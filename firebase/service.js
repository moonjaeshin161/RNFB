import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const createUser = async (user) => {
    try {
        await auth().createUserWithEmailAndPassword(user.email, user.password);
        await auth().currentUser.updateProfile({
            displayName: user.displayName
        })
        await firestore()
            .collection('users')
            .add({
                email: user.email,
                displayName: user.displayName
            })
    } catch (e) {
        console.log(e.message);
    }
}