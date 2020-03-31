import auth from '@react-native-firebase/auth';

export const createUser = async (user) => {
    try {
        await auth().createUserWithEmailAndPassword(user.email, user.password);
        await auth().currentUser.updateProfile({
            displayName: user.displayName
        })
    } catch (e) {
        console.log(e.message);
    }
}