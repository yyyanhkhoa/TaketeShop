import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Card from './UI/Card';
import * as orderActions from '../store/actions/order';
import {useNavigation} from '@react-navigation/native';
import {ORDER_DETAIL_SCREEN} from '../constants/NavigatorIndex';
import Colors from '../constants/Colors';

function OrderNotification(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bttClickHandler = () => {
    dispatch(
      orderActions.cancelWaitingOrdersWithOrderID({
        orderID: props.item.orderID,
        token: props.token,
      }),
    );
  };
  const onItemClickHandler = () => {
    dispatch(orderActions.setCurrentOrder(props.item));
    navigation.navigate(ORDER_DETAIL_SCREEN);
  };
  const date = props.item.createTime.slice(0, 10).split('-');
  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableOpacity activeOpacity={0.9} onPress={onItemClickHandler}>
        <Card style={styles.notificationContainer}>
          <Text style={styles.text}>
            {date[2]}/{date[1]}/{date[0]} - {props.item.orderID} ({props.item.quantity} sản phẩm)
          </Text>

          <View style={styles.buttonContainer}>
            <Text style={styles.textPrice}>{props.item.totalCost} đ</Text>
            {props.item.status != 'WAITING' ? (
              <Button
                style={styles.button}
                color={Colors.primaryColor}
                title="Chi tiết đơn hàng"
                onPress={onItemClickHandler}></Button>
            ) : (
              <Button
                style={styles.button}
                color={'#CD5C5C'}
                title="Hủy Đơn Hàng"
                onPress={bttClickHandler}></Button>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  notificationContainer: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 2,
  },
  button: {},
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryColor
  },
  textContainer: {
    justifyContent: 'space-between',
  },
});
export default OrderNotification;
