import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OrderNotification from '../../components/OrderNotification';
import * as orderActions from '../../store/actions/order';

function OrderConfirmPage() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.confirmedOrders);
  const userID = useSelector(state => state.auth.userID);
  const token = useSelector(state => state.auth.token);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigation();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(
        orderActions.fetchConfirmedOrdersWithUserID({id: userID, token: token}),
      );
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useLayoutEffect(() => {
    return navigation.addListener('focus', loadOrders);
  }, [loadOrders]);
  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrders]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator></ActivityIndicator>
        <Text>Đang tải sản phẩm...</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      {orders.length ? (
        <FlatList
          onRefresh={loadOrders}
          refreshing={isRefreshing}
          data={orders}
          renderItem={itemData => (
            <OrderNotification
              item={itemData.item}
              userID={userID}
              token={token}></OrderNotification>
          )}></FlatList>
      ) : (
          <View style={styles.centered}>
            <Text>Hiện đang không có sản phẩm nào đã được xác nhận</Text>
          </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default OrderConfirmPage;
