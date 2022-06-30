import React, { useState, useEffect, componentdiv } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList, Alert,
} from 'react-native';
import { TextInput, Button, Colors, IconButton, Avatar } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import Header from '../../../../components/UI/Header';
import Header from '../../../../components/UI/Header';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as discountActions from '../../../../store/actions/discount';
import { BANNER_SCREEN, DISCOUNT_SCREEN, FIX_DISCOUNT } from '../../../../constants/NavigatorIndex';

import { Form } from 'formik';

function ListDiscount() {
  let ALL_LIST_DISCOUNT = useSelector(state => state.discount.discounts);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(discountActions.fetchDiscount());
  }, [ALL_LIST_DISCOUNT]);

  const getDiscount = async (dID) => {
    await dispatch(discountActions.getDiscountByID(dID)) ;
    navigation.navigate(FIX_DISCOUNT) ;
  }
  const Banner = (item) => {
    return (
      <View style={styles.container}>
        <View style={styles.screenrow}>
          <TouchableOpacity
            onPress={() => {
              getDiscount(item.id)               
            }}>

            <View style={{ width: 290 }}>
              <Text style={styles.text1}>
                {item.voucher} </Text>
              <View style={{
                flexDirection: 'row',
              }}>
                <Text style={styles.text2}>
                  Tỉ lệ giảm giá: {item.discount}%</Text>
              </View>

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
                Alert.alert(
                  "Xóa mã khuyến mãi",
                  "Bạn có chắc muốn xóa mã khuyến mãi này không?",
                  [
                    {
                      text: "Không",
                      onPress: () => {
                        console.log("Cancel delete")
                      },
                      style: "cancel"
                    },
                    {
                      text: "Có", onPress: () => {
                        dispatch(discountActions.deleteDiscount(item.id));                                           
                      }
                    }
                  ]
                );
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
      <Header title="Danh sách mã giảm giá"
        children={
          <IconButton
            icon={'plus'}
            color={'white'}
            size={25}
            onPress={() => navigation.navigate(DISCOUNT_SCREEN)}></IconButton>
        }></Header>

      <FlatList
        data={ALL_LIST_DISCOUNT}
        extraData={ALL_LIST_DISCOUNT}
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
export default ListDiscount;
