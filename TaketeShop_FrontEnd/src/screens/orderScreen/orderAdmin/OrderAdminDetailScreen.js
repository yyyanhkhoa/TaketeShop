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
import Card from '../../../components/UI/Card';
import Header from '../../../components/UI/Header';
import Colors from '../../../constants/Colors';
import * as orderActions from '../../../store/actions/order';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {convertOrderStatusToVietnameseWithDetail} from '../../../ulti/Ulti';
import OrderItem from '../../../components/OrderItem';
import {ADMIN_ORDER_NAVIGATOR} from '../../../constants/NavigatorIndex';
function OrderAdminDetailScreen(props) {
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
        <Text>C?? l???i, vui l??ng th??? l???i</Text>
        <Button
          title="Th??? l???i"
          onPress={loadProducts}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  const [statusAction, setStatusAction] = useState(() => {
    switch (order.status) {
      case 'WAITING':
        return {
          title: 'X??c nh???n ????n h??ng',
          func: () => {
            dispatch(
              orderActions.confirmOrdersWithOrderID({
                orderID: order.orderID,
                token: token,
              }),
            );
            navigation.goBack();
          },
          cancelFunc: () => {
            dispatch(
              orderActions.cancelWaitingOrdersWithOrderID({
                orderID: order.orderID,
                token: token,
              }),
            );
            navigation.goBack();
          },
        };
      case 'CONFIRMED':
        return {
          title: 'Giao h??ng',
          func: () => {
            dispatch(
              orderActions.deliveryOrdersWithOrderID({
                orderID: order.orderID,
                token: token,
              }),
            );
            navigation.goBack();
          },
          cancelFunc: () => {
            dispatch(
              orderActions.cancelConfirmOrdersWithOrderID({
                orderID: order.orderID,
                token: token,
              }),
            );
            navigation.goBack();
          },
        };
      case 'DELIVERING':
        return {
          title: '???? giao th??nh c??ng',
          func: () => {
            dispatch(
              orderActions.deliveredOrdersWithOrderID({
                orderID: order.orderID,
                token: order.token,
              }),
            );
            navigation.goBack();
          },
          cancelFunc: () => {
            dispatch(
              orderActions.cancelDeliveryOrdersWithOrderID({
                orderID: order.orderID,
                token: order.token,
              }),
            );
            navigation.goBack();
          },
        };
      case 'DELIVERED':
        return {
          title: 'Tr??? v???',
          func: () => {
            navigation.navigate(ADMIN_ORDER_NAVIGATOR);
          },
          cancelFunc: () => {
            dispatch(
              orderActions.cancelDeliveredOrdersWithOrderID({
                orderID: order.orderID,
                token: token,
              }),
            );
            navigation.goBack();
          },
        };
      default:
        return {
          title: 'Tr??? v???',
          func: () => {
            dispatch(orderActions.setCurrentOrder(props.item));
            navigation.navigate(ADMIN_ORDER_NAVIGATOR);
          },
          cancelFunc: () => console.log('Cancel n??'),
        };
    }
  });
  return (
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.screen}>
            <Header title="Th??ng tin ????n h??ng"></Header>
            <Card style={styles.statusContainer}>
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusTextTitle}>
                  ????n h??ng {status.status}
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
                <Text style={styles.title}>?????a ch??? nh???n h??ng</Text>
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
                      <Text style={styles.title}>????n h??ng</Text>
                    </View>
                    <Text style={styles.idOrderText}>#{order.orderID}</Text>
                  </View>
                }
                ListFooterComponent={
                  isLoading ? (
                    <View style={styles.titleTextContainer}>
                      <ActivityIndicator></ActivityIndicator>
                      <Text>??ang t???i s???n ph???m...</Text>
                    </View>
                  ) : (
                    <View style={styles.totalBillContainer}>
                      <Text style={styles.title}>Th??nh ti???n</Text>
                      <Text style={styles.title}>{order.totalCost} ??</Text>
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
                <Text style={styles.title}>Ph????ng th???c thanh to??n</Text>
              </View>
              <Text style={styles.text}>
                Thanh to??n b???ng{' '}
                {order.payment == 'CASH' ? 'ti???n m???t' : 'chuy???n kho???n'}
              </Text>
            </Card>
          </View>
        }></FlatList>
      {order.status == 'CANCEL' ? (
        <></>
      ) : (
        <>
          <Card style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.bottomStatusButton}
              onPress={statusAction.func}>
              <Text style={styles.bottomText}>{statusAction.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={statusAction.cancelFunc}>
              <Text style={styles.bottomText}>H???y ????n h??ng</Text>
            </TouchableOpacity>
          </Card>
        </>
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
    width: '70%',
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
    height: 70,
    padding: 10,
    borderRadius: 0,
    flexDirection: 'row',
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CD5C5C',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
  },
  bottomStatusButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default OrderAdminDetailScreen;
