import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  BOTTOM_BAR_NAVIGATOR,
  LOGIN_NAVIGATOR,
} from '../constants/NavigatorIndex';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth'
import * as productActions from '../store/actions/products';
import * as bannerActions from '../store/actions/banner';
function StartupScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          navigation.navigate(LOGIN_NAVIGATOR);
          return;
        }

        const transformedData = JSON.parse(userData);

        const {token, userId, expiryDate} = transformedData;
        const expirationDate = await new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          navigation.navigate(LOGIN_NAVIGATOR);
          return;
        }
        const expirationTime = expirationDate.getTime() - new Date().getTime();

        navigation.navigate(BOTTOM_BAR_NAVIGATOR);

        dispatch(authActions.authenticate(userId, token, expirationTime));
      } catch (err) {
        console.log(err);
        navigation.navigate(LOGIN_NAVIGATOR);
      }
    };

    tryLogin();
  }, [dispatch, isFocused]);
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/img_appLogo.png')}></Image>
      </View>
      <View style={{flex: 1}}>
      <ActivityIndicator
        size={'large'}
        color={Colors.primaryColor}></ActivityIndicator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '101%',
    padding: 35,
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '110%',
    height: '105%',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
