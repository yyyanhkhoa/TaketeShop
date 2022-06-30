import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Form1 from './Form';
import Button1 from '../../store/actions/button';
import { TextInput, Button, Colors, IconButton } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



function SupportScreen() {
  //  const navigation = useNavigation()

    return (
        <View>
           <Text>jkasdas</Text>

        </View>



    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
   
});
export default SupportScreen;