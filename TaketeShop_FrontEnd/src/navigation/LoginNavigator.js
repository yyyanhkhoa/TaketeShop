import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGIN_MAIN_SCREEN, FORGOT_PASSWORD_SCREEN } from '../constants/NavigatorIndex';
import LoginScreen from '../screens/Login_screen/LoginScreen';
import ForgotPassword from '../screens/Login_screen/ForgotPassword';

import SignUpScreen from '../screens/Login_screen/SignUp';
import SuccesScreen from '../screens/Login_screen/SuccesScreen';


const Stack = createNativeStackNavigator();

function LoginNavigator(props) {

  return (
    <Stack.Navigator initialRouteName={LOGIN_MAIN_SCREEN}>
      <Stack.Screen
        name={LOGIN_MAIN_SCREEN}
        options={{ headerShown: false }}
        component={LoginScreen}>
      </Stack.Screen>

      <Stack.Screen
        name={FORGOT_PASSWORD_SCREEN}
        options={{ headerShown: false }}
        component={ForgotPassword}>
      </Stack.Screen>

      <Stack.Screen
        name={"SignUpScreen"}
        options={{ headerShown: false }}
        component={SignUpScreen}>
      </Stack.Screen>
      <Stack.Screen
        name={"SuccesScreen"}
        options={{ headerShown: false }}
        component={SuccesScreen}>
      </Stack.Screen>



    </Stack.Navigator>

  );

}



export default LoginNavigator;  