import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as ListStaff from '../../store/actions/ListStaff';

function Phone(props) {
  const [phonenumber, setPhonenumber] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch(); 
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.staff.admin);
  let userID;
  if (admin) {
    userID =useSelector(state => state.staff.userID);
  }else {
    userID = useSelector(state => state.auth.userID);
  }

  return (
    <View style={styles.screen}>
      <Header title="Thay đổi số điện thoại"></Header>
      <View style={styles.screen1}>
        <TextInput
          keyboardType="numeric"
          maxLength={10}
          label="Số điện thoại"
          placeholder={'Mời nhập số điện thoại'}
          style={{backgroundColor: Colors.backgroundColor}}
          mode="outlined"
          value={phonenumber}
          onChangeText={phonenumber => setPhonenumber(phonenumber)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          contentStyle={styles.buttonText}
          style={styles.button}
          color="#4F5160"
          labelStyle={{fontSize: 20}}
          onPress={() => {
            if (admin) {
              dispatch(ListStaff.changePhone(userID, token, phonenumber));                
            }else {
              dispatch(authActions.changePhone(userID, token, phonenumber));              
            }   
            navigation.navigate('Profile');        
          }}>
          Xác nhận
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  screen1: {
    padding: 10,
    flex: 14,
    backgroundColor: Colors.backgroundColor,
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
  dropdown: {
    top: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    backgroundColor: Colors.backgroundColor,
  },
  expand: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: '#FF9C40',
  },
  itemList: {
    flex: 4,
  },

  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttonContainer: {
    margin: 5,
    borderRadius: 40,
    color: '#4f5160',
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
});
export default Phone;
