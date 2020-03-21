import React, { useState } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/stack/Auth';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import HomeTab from './navigation/tab/Home';
import auth from '@react-native-firebase/auth';
import { loginSuccess } from './views/authentication/redux/actions';
import { Text } from 'react-native';


const MainApp = () => {
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();

  const checkCurrentUser = async () => {
    const user = await auth().currentUser;
    if (user) {
      dispatch(loginSuccess())
    }
  }

  checkCurrentUser();


  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <NavigationContainer>
        {
          isLogin ? <HomeTab /> : <AuthStack />
        }
      </NavigationContainer>
    </ApplicationProvider>

  );
}

const App = () => (
  <Provider store={store}><MainApp /></Provider >
)

export default App;

