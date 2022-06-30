import React, { useState, useEffect, componentdiv } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Form1 from '../accountScreen/Form';
import { TextInput, Button, Colors, IconButton } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import Header from '../../components/UI/Header';
import * as ListStaff from '../../store/actions/ListStaff';

function Profile(props) {

  const navigation = useNavigation();
  const dispatch = useDispatch();  

  const userID = useSelector(state => state.staff.userID);
  let name;
  let gender;
  let birthday;
  let email;
  let phoneNumber;
  let img;
  let date;
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.staff.admin);



  // const token = useSelector(state => state.auth.token);
  if (admin) {
    name = useSelector(state => state.staff.name);
    gender = useSelector(state => state.staff.gender);
    birthday = useSelector(state => state.staff.birthday);
    email = useSelector(state => state.staff.email);
    phoneNumber = useSelector(state => state.staff.phone);
    img = useSelector(state => state.staff.avatar);

    date = birthday.slice(0, 10).split('-');
  }
  else {
    name = (useSelector(state => state.auth.name));
    gender = (useSelector(state => state.auth.gender));
    birthday = (useSelector(state => state.auth.birthday));
    email = (useSelector(state => state.auth.email));
    phoneNumber = (useSelector(state => state.auth.phone));
    img = (useSelector(state => state.auth.avatar));
    date = birthday.slice(0, 10).split('-');
  }

  const DeleteStaff = () =>
    Alert.alert(
      "Xóa tài khoản",
      "Bạn có chắc muốn xóa nhân viên này ?",
      [
        {
          text: "Không",
          onPress: () => {
            console.log("Cancel delete")
          },
          style: "cancel"
        },
        { text: "Có", onPress: () => {
          dispatch(ListStaff.deleteStaff(userID, token));
          dispatch(ListStaff.getAllStaff(token));
          navigation.goBack();
        } }
      ]
    );

  return (
    <ScrollView style={styles.container}>
      <Header title="Thông tin cá nhân"></Header>
      <View style={styles.containeravatar}>
        <TouchableOpacity
        //</View> onPress={chooseFile} 
        >

          <Avatar.Image
            size={100}
            source={{ uri: img }}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.text1}> {name}</Text>
          <Text style={styles.text2}> {email}</Text>
        </View>
      </View>
      <Form1
        icons="account"
        titletext="Tên tài khoản"
        onPress={() => {
          navigation.navigate('ChangeName');
        }}
        titletext2={name}
      />
      <Form1
        icons="gender-male-female"
        titletext="Giới tính"
        onPress={() => {
          navigation.navigate('Gender');
        }}
        value={gender}
        titletext2={gender == 1 ? 'Nam' : 'Nữ'}
      />
      <Form1
        icons="calendar-month"
        titletext="Ngày sinh"
        onPress={() => {
          navigation.navigate('Birth');
        }}
        titletext2={`${date[2]}/${date[1]}/${date[0]}`}
      />
      <Form1
        icons="email"
        titletext="Email"
        onPress={() => {
          navigation.navigate('Email');
        }}
        titletext2={email}
      />
      <Form1
        icons="cellphone"
        titletext="Số điện thoại"
        onPress={() => {
          navigation.navigate('Phone');
        }}
        titletext2={phoneNumber}
      />
      <Form1
        icons="lock"
        titletext="Đổi mật khẩu"
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}
        titletext2={'*******'}
      />

      {admin === true ?
        (<Form1
          icons="account-remove"
          titletext="Xóa tài khoản"
          onPress={ DeleteStaff
          }
        />
        ) : null
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  containeravatar: {
    backgroundColor: '#ffff',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  text1: {
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'open-sans-bold',
    textShadowRadius: 1,
    alignItems: 'flex-start',
  },
  text2: {
    left: 5,
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'open-sans-bold',
    textShadowRadius: 1,
    alignItems: 'flex-start',
  },
});
export default Profile;
