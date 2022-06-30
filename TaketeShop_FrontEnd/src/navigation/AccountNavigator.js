import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ACCOUNT_MAIN_SCREEN, CHAT_SCREEN, LIST_CHANEL, LIST_STAFF_SCREEN, ADD_STAFF_SCREEN, PROFILE_NAVIGATOR } from '../constants/NavigatorIndex';
import AccountMainScreen from '../screens/accountScreen/AccountMainScreen';
import ChatScreen from '../screens/accountScreen/ChatScreen/ChatScreen';
import ListChanel from '../screens/accountScreen/ChatScreen/ListChanel';

import AddStaff from '../screens/accountScreen/ForAdmin/AddStaff';
import ListStaffScreen from '../screens/accountScreen/ForAdmin/ListStaffScreen';
import ProfileNavigator from './ProfileNavigator';
import SuccesScreen from '../screens/Login_screen/SuccesScreen';

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator initialRouteName={ACCOUNT_MAIN_SCREEN}>
      <Stack.Screen
        name={ACCOUNT_MAIN_SCREEN}
        options={{ headerShown: false }}
        component={AccountMainScreen}></Stack.Screen>
      <Stack.Screen
        name={CHAT_SCREEN}
        options={{ headerShown: false }}
        component={ChatScreen}>
      </Stack.Screen>
      
      <Stack.Screen
        name={PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{
          headerShown: false,
        }}></Stack.Screen>

      <Stack.Screen
        name={LIST_CHANEL}
        options={{ headerShown: false }}
        component={ListChanel}>
      </Stack.Screen>

      <Stack.Screen
        name={LIST_STAFF_SCREEN}
        options={{ headerShown: false }}
        component={ListStaffScreen} />
     
      <Stack.Screen
        name={ADD_STAFF_SCREEN}
        options={{ headerShown: false }}
        component={AddStaff} />

      <Stack.Screen
        name={"SuccesScreen"}
        options={{ headerShown: false }}
        component={SuccesScreen}>
      </Stack.Screen>
    </Stack.Navigator>

  );
}

export default AccountNavigator;
