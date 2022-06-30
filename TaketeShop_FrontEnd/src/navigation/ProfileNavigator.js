import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/ProfileScreen/ProfileScreen';
import Gender from '../screens/ProfileScreen/Gender';
import BirthScreen from '../screens/ProfileScreen/BirthScreen';
import Email from '../screens/ProfileScreen/Email';
import Phone from '../screens/ProfileScreen/PhoneScreen';
import ChangePassword from '../screens/ProfileScreen/ChangePassword';
import ChangeName from '../screens/ProfileScreen/ChangeName';


const Stack = createNativeStackNavigator();

function ProfileNavigator() {
  const [text, onChangeText] = React.useState(null);
    
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen
        name={"Profile"}
        options={{ headerShown: false, }}
        component={Profile}>
      </Stack.Screen>
      <Stack.Screen
        name={"ChangeName"}
        options={{ headerShown: false, }}
        component={ChangeName}>
      </Stack.Screen>
      <Stack.Screen
        name={"Gender"}
        options={{ headerShown: false, }}
        component={Gender}>
      </Stack.Screen>
      <Stack.Screen
        name={"Birth"}
        options={{ headerShown: false, }}
        component={BirthScreen}>
      </Stack.Screen>
      <Stack.Screen
        name={"Email"}
        options={{ headerShown: false, }}
        component={Email}>
      </Stack.Screen>
      <Stack.Screen
        name={"Phone"}
        options={{ headerShown: false, }}
        component={Phone}>
      </Stack.Screen>
      <Stack.Screen
        name={"ChangePassword"}
        options={{ headerShown: false, }}
        component={ChangePassword}>
      </Stack.Screen>



    </Stack.Navigator>

  );

}



export default ProfileNavigator;  