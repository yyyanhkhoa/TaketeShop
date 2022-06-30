import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Address from '../../components/Address';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ADD_ADDRESS_SCREEN, PAYMENT_SCREEN} from '../../constants/NavigatorIndex';
import * as addressActions from '../../store/actions/address';
import * as cartActions from '../../store/actions/cart';
import {useDispatch, useSelector} from 'react-redux';
function AddressScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.address.addresses);
  const userID = useSelector(state => state.auth.userID);
  const makeOrderPhase = route.params.makeOrder;

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  
  const onConfirm = () => {
    dispatch(cartActions.pickAddress(addresses.find(item => item.isSelected), userID));
    navigation.navigate(PAYMENT_SCREEN);
  }
  const confirmButton = makeOrderPhase? (<View style={styles.buttonContainer}>
    <Button
      mode="contained"
      contentStyle={styles.buttonText}
      style={styles.button}
      color={Colors.iconColor}
      labelStyle={{fontSize: 20}}
      onPress={onConfirm}>
      Xác nhận
    </Button>
  </View>) : <View></View>;

  const loadAddress = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(addressActions.fetchAddress(userID));
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useLayoutEffect(() => {
    return navigation.addListener('focus', loadAddress);
  }, [loadAddress]);
  useEffect(() => {
    setIsLoading(true);
    loadAddress().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadAddress]);

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
        <Text>Đang tải địa chỉ...</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Header title={'Địa Chỉ'}>
        <IconButton
          icon={'plus'}
          color={Colors.iconColor}
          size={26}
          onPress={() => navigation.navigate(ADD_ADDRESS_SCREEN)}
        />
      </Header>
      {addresses.length ? (
        <FlatList
          onRefresh={loadAddress}
          refreshing={isRefreshing}
          data={addresses}
          renderItem={itemData => <Address item={itemData.item}></Address>}
          ListFooterComponent={
            confirmButton
          }></FlatList>
      ) : (
          <View style={styles.centered}>
            <Text>Hiện đang không có địa chỉ</Text>
          </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: Colors.primaryColor,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemsList: {
    flex: 1,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
});

export default AddressScreen;
