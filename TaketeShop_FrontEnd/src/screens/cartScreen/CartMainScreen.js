import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItems from '../../components/CartItems';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import {ADDRESS_SCREEN} from '../../constants/NavigatorIndex';
import * as cartActions from '../../store/actions/cart';
import {ColorSpace} from 'react-native-reanimated';
import DiscountModal from '../../components/Modal/DiscoutModal';
const SHIPPING_VALUE = +50000;
function CartMainScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const selectedCartItem = cartItems.filter(item => item.isSelected === true);
  const userID = useSelector(state => state.auth.userID);
  const [modalVisible, setModalVisible] = useState(false);
  const [discount, setDiscount] = useState(0);
  const onConfirmHandler = () => {

    if (selectedCartItem.length) {
      dispatch(
        cartActions.pickCartItems(
          selectedCartItem,
          displayCount(),
          (displayTotal() / 100) * 5 + shippingFee + displayTotal(),
        ),
      );
      navigation.navigate(ADDRESS_SCREEN, {makeOrder: true});
    } else {
      Alert.alert('Giỏ hàng trống', 'Vui lòng chọn sản phẩm trong giỏ hàng!', [
        {text: 'Okay'},
      ]);
    }
  };
  const [flag, setFlag] = useState(true);
  const shippingFee = selectedCartItem.length ? SHIPPING_VALUE : 0;
  const onCheckAllHandler = () => {
    dispatch(cartActions.checkAllCartItems(flag));
    setFlag(!flag);
  };
  const onDiscountHandler = () => {
    setModalVisible(!modalVisible);
  };
  const displayCount = () => {
    let count = 0;
    selectedCartItem.map(item => (count += item.quantity));
    return count;
  };
  const displayTotal = () => {
    let total = 0;
    selectedCartItem.map(item => (total += item.quantity * item.discountPrice));
    return total;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const loadCartItems = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(cartActions.fetchCartWithUserID(userID));
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  useLayoutEffect(() => {
    return navigation.addListener('focus', loadCartItems);
  }, [loadCartItems]);
  useEffect(() => {
    setIsLoading(true);
    loadCartItems().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCartItems]);
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
    <View style={styles.screen}>
      <Header title={'Giỏ hàng'} back={true}>
        <IconButton
          icon="brightness-percent"
          onPress={onDiscountHandler}
          color={Colors.backgroundColor}
        />
      </Header>
      <View style={styles.chooseAllContainer}>
        <Text style={styles.title}>
          Chọn tất cả ({selectedCartItem.length}):
        </Text>
        {flag ? (
          <IconButton
            icon="checkbox-blank-circle-outline"
            onPress={onCheckAllHandler}
            color={Colors.primaryColor}
          />
        ) : (
          <IconButton
            icon="checkbox-blank-circle"
            onPress={onCheckAllHandler}
            color={Colors.primaryColor}
          />
        )}
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{flex: 1, padding: 200}}>
            <View style={{backgroundColor: 'white', flex: 1}}>

            </View>
          </View>
        </TouchableOpacity>
      </Modal> */}
      {cartItems.length ? (
        <>
          <View style={styles.cartItemsList}>
            <FlatList
              onRefresh={loadCartItems}
              refreshing={isRefreshing}
              data={cartItems}
              renderItem={itemData => (
                <CartItems item={itemData.item}></CartItems>
              )}></FlatList>
          </View>
          <View style={styles.cartDetail}>
            <View style={styles.row}>
              <Text style={styles.title}>Sản phẩm ({displayCount()}):</Text>
              <Text style={styles.value}>{displayTotal()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Phí giao hàng:</Text>
              <Text style={styles.value}>{shippingFee}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Giảm giá:</Text>
              <Text style={styles.value}>{discount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Thuế VAT (8%):</Text>
              <Text style={styles.value}>{(displayTotal() / 100) * 5}</Text>
            </View>
            <View style={styles.rowTotal}>
              <Text style={styles.titleTotal}>Tổng cộng</Text>
              <Text style={styles.valueTotal}>
                {(displayTotal() / 100) * 5 + shippingFee + displayTotal()}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              contentStyle={styles.buttonText}
              style={styles.button}
              color={Colors.primaryColor}
              labelStyle={{fontSize: 20}}
              onPress={onConfirmHandler}>
              Xác nhận
            </Button>
          </View>
        </>
      ) : (
        <View style={styles.cartItemsList}>
          <View style={styles.centered}>
            <Text>Hiện đang không có sản phẩm nào trong giỏ hàng</Text>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    height: 50,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  cartItemsList: {
    flex: 7,
  },
  cartDetail: {
    flex: 2,
    borderRadius: 5,
    borderColor: '#EBF0FF',
    borderWidth: 2,
    padding: 10,
    paddingTop: 0,
    margin: 15,
  },
  chooseAllContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
  },
  value: {
    fontSize: 15,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopColor: '#EBF0FF',
    borderTopWidth: 2,
    alignItems: 'center',
  },
  titleTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  valueTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.iconColor,
  },
  buttonContainer: {
    padding: 10,
    flex: 1,
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
});

export default CartMainScreen;
