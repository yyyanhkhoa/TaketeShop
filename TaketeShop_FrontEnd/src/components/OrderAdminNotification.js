import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import {ORDER_ADMIN_DETAIL_SCREEN, ORDER_DETAIL_SCREEN} from '../constants/NavigatorIndex';
import Colors from '../constants/Colors';

function OrderAdminNotification(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [statusAction, setStatusAction] = useState(() => {
    switch (props.item.status) {
      case 'WAITING':
        return {
          title: 'Xác nhận đơn hàng',
          func: () =>
            dispatch(
              orderActions.confirmOrdersWithOrderID({
                orderID: props.item.orderID,
                token: props.token,
              }),
            ),
          cancelFunc: () =>
            dispatch(
              orderActions.cancelWaitingOrdersWithOrderID({
                orderID: props.item.orderID,
                token: props.token,
              }),
            ),
        };
      case 'CONFIRMED':
        return {
          title: 'Giao hàng',
          func: () =>
            dispatch(
              orderActions.deliveryOrdersWithOrderID({
                orderID: props.item.orderID,
                token: props.token,
              }),
            ),
          cancelFunc: () =>
            dispatch(
              orderActions.cancelConfirmOrdersWithOrderID({
                orderID: props.item.orderID,
                token: props.token,
              }),
            ),
        };
      case 'DELIVERING':
        return {
          title: 'Đã giao thành công',
          func: () =>
            dispatch(
              orderActions.deliveredOrdersWithOrderID({
                orderID: props.item.orderID,
                token: props.token,
              }),
            ),
          cancelFunc: () =>
            dispatch(
              orderActions.cancelDeliveryOrdersWithOrderID({
                orderID: props.item.orderID,
                token: props.token,
              }),
            ),
        };
        case 'DELIVERED':
          return {
            title: 'Chi tiết đơn hàng',
            func: () => {
              dispatch(orderActions.setCurrentOrder(props.item));
              navigation.navigate(ORDER_DETAIL_SCREEN);
            },
            cancelFunc: () =>
            dispatch(
              orderActions.cancelDeliveredOrdersWithOrderID({
                orderID: props.item.orderID,
                token: props.token,
              }),
            ),
          };
      default:
        return {
          title: 'Chi tiết đơn hàng',
          func: () => {
            dispatch(orderActions.setCurrentOrder(props.item));
            navigation.navigate(ORDER_DETAIL_SCREEN);
          },
          cancelFunc: () =>
            console.log('Cancel nè')
        };
    }
  });

  const bttUpdateStatusClickHandler = () => {
    statusAction.func();
  };
  const onItemClickHandler = () => {
    dispatch(orderActions.setCurrentOrder(props.item));
    navigation.navigate(ORDER_ADMIN_DETAIL_SCREEN);
  };

  const date = props.item.createTime.slice(0, 10).split('-');

  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableOpacity activeOpacity={0.9} onPress={onItemClickHandler}>
        <Card style={styles.notificationContainer}>
          <Text style={styles.text}>
            {date[2]}/{date[1]}/{date[0]} - {props.item.orderID} (
            {props.item.quantity} sản phẩm): {props.item.name}
          </Text>

          {props.item.status == 'CANCEL'? (
            <View style={styles.buttonCancelContainer}>
              <Text style={styles.textPrice}>{props.item.totalCost} đ</Text>
              <Button
                style={styles.button}
                color={Colors.primaryColor}
                title={statusAction.title}
                onPress={bttUpdateStatusClickHandler}></Button>
            </View>
          ) : (
            <>
              <Text style={styles.textPrice}>{props.item.totalCost} đ</Text>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  color={Colors.primaryColor}
                  title={statusAction.title}
                  onPress={bttUpdateStatusClickHandler}></Button>
                <View style={styles.buttonSpace}></View>
                <Button
                  style={styles.button}
                  color={'#CD5C5C'}
                  title="Hủy Đơn Hàng"
                  onPress={statusAction.cancelFunc}></Button>
              </View>
            </>
          )}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 2,
  },
  buttonCancelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 2,
  },
  buttonSpace: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  textContainer: {
    justifyContent: 'space-between',
  },
});
export default OrderAdminNotification;
