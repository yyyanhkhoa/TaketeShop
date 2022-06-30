import React, { useState, useEffect, componentdiv } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { TextInput, Button, Colors, IconButton, Avatar } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Header from '../../../../components/UI/Header';
//import Header from '../../../../components/UI/Header';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as authActions from '../../../../store/actions/auth';
import * as chanelActions from '../../../../store/actions/chanelActions';
import { BANNER_SCREEN, DISCOUNT_SCREEN, FIX_BANNER } from '../../../../constants/NavigatorIndex';
import * as productActions from '../../../../store/actions/products';
import * as bannerActions from '../../../../store/actions/banner';
import { Form } from 'formik';

function ListBanner() {
  let ALL_LIST_BANNER = useSelector(state => state.banner.banners);
  //let ALL_LIST_BANNER = useSelector(state => state.products.productsByCategoryID);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  let chanelID = useSelector(state => state.chanel._id);
  let img = useSelector(state => state.auth.avatar);
  const token = useSelector(state => state.auth.token);

  const Banner = (item) => {
    return (
      <View style={styles.container}>
        <View style={styles.screenrow}>
          <TouchableOpacity
            onPress={() => {
              dispatch(bannerActions.getBannerByID(item.id));
              navigation.navigate(FIX_BANNER);
              
            }}>

            <View style={{ width: 290 }}>
              <Text style={styles.text1}>
                {item.title} </Text>
              <Text style={styles.text2}>
                {item.id}</Text>
            </View>

          </TouchableOpacity>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
            <TouchableOpacity
              onPress={() => {
                console.log("Delete banner");
              }}>
              <MaterialCommunityIcons
                name="delete"
                color={Colors.iconColor}
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View >

    )
  };
  const renderBanner = (item) => {
    return (
      Banner(item)
    )
  };
  return (

    <SafeAreaView style={styles.screen}>
      <Header title="Danh sách banner"
        children={
          <IconButton
            icon={'plus'}
            color={'white'}
            size={25}
            onPress={() => {
              dispatch(productActions.fetchCategory());
              navigation.navigate(BANNER_SCREEN)
            }}></IconButton>
        }></Header>

      <FlatList
        data={ALL_LIST_BANNER}
        extraData={ALL_LIST_BANNER}
        renderItem={itemData => (renderBanner(itemData.item))}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#D3D3D388', top: 5, marginHorizontal: 8 }}

      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#d4d4d4',
  },
  container: {
    borderRadius: 20,
    height: 80,
    margin: 10,
    flex: 1,
    backgroundColor: '#ffff',
  },
  screenrow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 1,
  },
  expandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text1: {
    left: 7,
    fontSize: 20,
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
export default ListBanner;
