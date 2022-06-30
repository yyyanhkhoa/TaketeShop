import React from 'react';
import {View, StyleSheet, FlatList, Text, ScrollView} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form1 from './Form';
import {
  ADDRESS_SCREEN,
  ADD_ADDRESS_SCREEN,
  ADMIN_NAVIGATOR,
  LOGIN_MAIN_SCREEN,
  LOGIN_NAVIGATOR,
  PROFILE_NAVIGATOR,
  STARTUP_SCREEN,
} from '../../constants/NavigatorIndex';
import * as authActions from '../../store/actions/auth';
import * as chanelActions from '../../store/actions/chanelActions';
import * as ListStaff from '../../store/actions/ListStaff';

function AccountMainScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userID = useSelector(state => state.auth.userID);
  console.log('User ID:' + userID);
  const role = useSelector(state => state.auth.role);
  const token = useSelector(state => state.auth.token);
  const chanelId = useSelector(state => state.chanel.chanelId);
  return (
    <ScrollView style={styles.screen}>
      <Form1
        styles={styles.itemsContainer}
        icons="account"
        titletext="Thông tin cá nhân"
        onPress={() => {
          dispatch(ListStaff.getUser());
          //navigation.navigate('Profile', {type : 'user'});
          navigation.navigate(PROFILE_NAVIGATOR);
        }}
        //titletext2 = 'xcvjkz'
      />
      <Form1
        styles={styles.itemsContainer}
        icons="map-marker"
        titletext="Địa chỉ"
        onPress={() => navigation.navigate(ADDRESS_SCREEN, {makeOrder: false})}
      />

      {role !== 'CUSTOMER' || role !== 'GUEST' ? (
        <Form1
          styles={styles.itemsContainer}
          icons="credit-card-outline"
          titletext="Cửa hàng của tôi"
          onPress={() => navigation.navigate(ADMIN_NAVIGATOR)}
        />
      ) : null}

      <Form1
        styles={styles.itemsContainer}
        icons="face-agent"
        titletext="Hỗ trợ khách hàng"
        onPress={() => {
          if (role === 'CUSTOMER') {
            console.log('chanel get :' + chanelId);
            dispatch(chanelActions.getChanel(userID));  
            dispatch(chanelActions.getMessagerFromChanelId(chanelId));
            navigation.navigate('ChatScreen',{titleHeader: "Hỗ trợ khách hàng"});
          } else {
            dispatch(chanelActions.getAllChanel());
            navigation.navigate('ListChanel');
          }
        }}
      />

      {role === 'SHOP' ? (
        <View>
          <Form1
            styles={styles.itemsContainer}
            icons="account-plus"
            titletext="Thêm nhân viên"
            onPress={() => navigation.navigate('AddStaff')}
          />
          <Form1
            styles={styles.itemsContainer}
            icons="account-multiple"
            titletext="Xóa/Sửa nhân viên"
            onPress={() => {
              //dispatch(ListStaff.getStaffFromUserID(4,token));
              dispatch(ListStaff.getAllStaff(token));
              navigation.navigate('ListStaffScreen');
            }}
          />
        </View>
      ) : null}

      <Form1
        styles={styles.itemsContainer}
        icons="logout"
        titletext="Đăng xuất"
        onPress={() => {
          dispatch(authActions.logout);
          navigation.navigate(STARTUP_SCREEN);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  itemsContainer: {
    height: 100,
  },
});

//function
export default AccountMainScreen;
