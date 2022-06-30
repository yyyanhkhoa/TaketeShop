import React from 'react';
import {View, StyleSheet, FlatList, Text, ScrollView} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/UI/Header';
import OptionsLine from '../../components/OptionsLine';
import {SUCCESS_SCREEN} from '../../constants/NavigatorIndex';
import * as cartActions from '../../store/actions/cart';

function PaymentScreens(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const cartDetail = useSelector(state => state.cart.cartDetail);

  const onCashHandler = () => {
    dispatch(cartActions.makeOrder({
      token: token,
      userID: cartDetail.userID,
      items: cartDetail.items,
      address: cartDetail.address,
      totalBill: cartDetail.totalBill,
      quantity: cartDetail.quantity,
      payment: "CASH"
    }))
    navigation.navigate(SUCCESS_SCREEN);
  };
  return (
    <View style={styles.screen}>
      <Header title={'Thanh toán'}></Header>
      <OptionsLine
        icon={'credit-card-outline'}
        confirmMessage={'Bạn muốn thanh toán bằng Paypal?'}
        title={'Paypal'}></OptionsLine>
      <OptionsLine
        icon={'cash'}
        title={'Tiền mặt'}
        confirmMessage={'Bạn muốn thanh toán bằng tiền mặt?'}
        onPress={onCashHandler}></OptionsLine>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
export default PaymentScreens;
