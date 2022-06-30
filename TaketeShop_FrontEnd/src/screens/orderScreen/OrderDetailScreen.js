import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../components/UI/Card';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import * as orderActions from '../../store/actions/order';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {convertOrderStatusToVietnameseWithDetail} from '../../ulti/Ulti';
import OrderItem from '../../components/OrderItem';
import { ORDER_WAITING_PAGE } from '../../constants/NavigatorIndex';
function OrderDetailScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order.currentOrder);
  const orderItems = useSelector(state => state.order.currentOrderItems);
  const token = useSelector(state => state.auth.token);
  const status = convertOrderStatusToVietnameseWithDetail(order.status);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const loadOrderItems = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(
        orderActions.fetchOrderItemsWithOrderID({
          id: order.orderID,
          token: token,
        }),
      );
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useLayoutEffect(() => {
    return navigation.addListener('focus', loadOrderItems);
  }, [loadOrderItems]);
  useEffect(() => {
    setIsLoading(true);
    loadOrderItems().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrderItems]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Có lỗi, vui lòng thử lại</Text>
        <Button
          title="Thử lại"
          onPress={loadProducts}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  const onCancelRequest = () => {
    dispatch(
      orderActions.cancelWaitingOrdersWithOrderID({
        orderID: order.orderID,
        token: token,
      }),
    );
    navigation.navigate(ORDER_WAITING_PAGE);
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.screen}>
            <Header title="Thông tin đơn hàng"></Header>
            <Card style={styles.statusContainer}>
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusTextTitle}>
                  Đơn hàng {status.status}
                </Text>
                <Text style={styles.statusText}>{status.detail}</Text>
              </View>
              <MaterialCommunityIcons
                name="clover"
                style={styles.icon}
                color={Colors.primaryColor}
                size={90}></MaterialCommunityIcons>
            </Card>
            <Card style={styles.addressContainer}>
              <View style={styles.titleTextContainer}>
                <MaterialCommunityIcons
                  name="truck-cargo-container"
                  style={styles.icon}
                  color={Colors.primaryColor}
                  size={30}></MaterialCommunityIcons>
                <Text style={styles.title}>Địa chỉ nhận hàng</Text>
              </View>
              <Text style={styles.text}>{order.name}</Text>
              <Text style={styles.text}>{order.phone}</Text>
              <Text style={styles.text}>
                {order.street}, {order.ward}, {order.district}, {order.province}
              </Text>
            </Card>
            <Card style={styles.addressContainer}>
              <FlatList
                ListHeaderComponent={
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={styles.titleTextContainer}>
                      <MaterialCommunityIcons
                        name="inbox-multiple-outline"
                        style={styles.icon}
                        color={Colors.primaryColor}
                        size={30}></MaterialCommunityIcons>
                      <Text style={styles.title}>Đơn hàng</Text>
                    </View>
                    <Text style={styles.idOrderText}>#{order.orderID}</Text>
                  </View>
                }
                ListFooterComponent={
                  isLoading ? (
                    <View style={styles.titleTextContainer}>
                      <ActivityIndicator></ActivityIndicator>
                      <Text>Đang tải sản phẩm...</Text>
                    </View>
                  ) : (
                    <View style={styles.totalBillContainer}>
                      <Text style={styles.title}>Thành tiền</Text>
                      <Text style={styles.title}>{order.totalCost} đ</Text>
                    </View>
                  )
                }
                onRefresh={loadOrderItems}
                refreshing={isRefreshing}
                data={orderItems}
                renderItem={itemData => (
                  <OrderItem item={itemData.item}></OrderItem>
                )}></FlatList>
            </Card>
            <Card style={styles.billContainer}>
              <View style={styles.titleTextContainer}>
                <MaterialCommunityIcons
                  name="page-layout-header"
                  style={styles.icon}
                  color={Colors.primaryColor}
                  size={30}></MaterialCommunityIcons>
                <Text style={styles.title}>Phương thức thanh toán</Text>
              </View>
              <Text style={styles.text}>
                Thanh toán bằng{' '}
                {order.payment == 'CASH' ? 'tiền mặt' : 'chuyển khoản'}
              </Text>
            </Card>
          </View>
        }></FlatList>
      {order.status == 'WAITING' ? (
        <Card style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomButton} onPress={onCancelRequest}>
            <Text style={styles.bottomText}>Hủy đơn hàng</Text>
          </TouchableOpacity>
        </Card>
      ) : (
        <></>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  statusContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#8fb4d5',
    borderBottomWidth: 0.3,
  },
  statusTextContainer: {
    padding: 5,
    width: '70%'
  },
  icon: {
    marginRight: 10,
  },
  titleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  idOrderText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusTextTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    margin: 10,
  },
  totalBillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 10,
  },
  addressContainer: {
    padding: 10,
    borderBottomWidth: 0.3,
  },
  billContainer: {
    padding: 10,
    marginVertical: 5,
  },
  bottomBar: {
    height: 60,
    padding: 10,
    borderRadius: 0,
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CD5C5C',
    borderRadius: 5,
    borderWidth: 1,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default OrderDetailScreen;
