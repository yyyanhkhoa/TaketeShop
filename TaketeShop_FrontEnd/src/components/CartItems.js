import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Pressable,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import {PRODUCT_DETAIL_SCREEN} from '../constants/NavigatorIndex';
import Card from './UI/Card';
import * as cartActions from '../store/actions/cart';
import {useDispatch, useSelector} from 'react-redux';

function CartItems(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [quantity, setQuantity] = useState(+props.item.quantity);
  const [selected, setSelected] = useState(props.item.isSelected);

  useLayoutEffect(() => {
    setSelected(props.item.isSelected);
    setQuantity(props.item.quantity)
  }, [props.item.isSelected, props.item.quantity])

  let typingTimeOutRef = useRef();

  const onChangeQuantity = async count => {
    if (quantity + count <= 0) {
      setQuantity(0);
      dispatch(cartActions.deleteCartItemByID(token, props.item.id));
    } else {
      setQuantity(quantity + count);
    }

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      dispatch(
        cartActions.updateCartItemQuantityByID(
          token,
          props.item.id,
          quantity + count,
        ),
      );
    }, 500);
  };
  const onSelect = () => {
    setSelected(!selected);
    dispatch(cartActions.selectCartItem(props.item.id, selected))
  }
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{...styles.screen, ...props.style}}>
      <TouchableCmp
        onPress={() =>
          navigation.navigate(PRODUCT_DETAIL_SCREEN, {
            id: props.item.productID,
          })
        }
        useForeground>
        <View style={styles.container}>
          <Card style={styles.product}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{uri: props.item.images[0].image}}></Image>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{props.item.name}</Text>
              <Text style={styles.price}>{props.item.discountPrice}</Text>
            </View>

            <View style={styles.actionContainer}>
              <View style={styles.iconContainer}>
              <TouchableCmp
                  onPress={() => dispatch(cartActions.deleteCartItemByID(token, props.item.id))}>
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      name="delete"
                      color={'#9098B1'}
                      size={26}
                    />
                  </View>
                </TouchableCmp>
                {selected ? (
                  <TouchableCmp
                    onPress={onSelect}>
                    <View style={styles.icon}>
                      <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        color={'#9098B1'}
                        size={26}
                      />
                    </View>
                  </TouchableCmp>
                ) : (
                  <TouchableCmp
                    onPress={onSelect}>
                    <View style={styles.icon}>
                      <MaterialCommunityIcons
                        name="checkbox-blank-circle-outline"
                        color={'#9098B1'}
                        size={26}
                      />
                    </View>
                  </TouchableCmp>
                )}
              </View>
              <View style={styles.addContainer}>
                <TouchableCmp onPress={() => onChangeQuantity(-1)}>
                  <View
                    style={{
                      ...styles.icon,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderColor: '#EBF0FF',
                    }}>
                    <MaterialCommunityIcons
                      name="minus"
                      color={'#9098B1'}
                      size={30}
                    />
                  </View>
                </TouchableCmp>
                <Text
                  style={{
                    fontSize: 17,
                    marginHorizontal: 5,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  {quantity}
                </Text>
                <TouchableCmp onPress={() => onChangeQuantity(+1)}>
                  <View
                    style={{
                      ...styles.icon,
                      borderBottomRightRadius: 5,
                      borderTopRightRadius: 5,
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderColor: '#EBF0FF',
                    }}>
                    <MaterialCommunityIcons
                      name="plus"
                      color={'#9098B1'}
                      size={30}
                    />
                  </View>
                </TouchableCmp>
              </View>
            </View>
          </Card>
        </View>
      </TouchableCmp>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  product: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    borderColor: '#EBF0FF',
    elevation: 0,
    borderWidth: 2,
  },
  imageContainer: {
    width: '25%',
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 5,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 5,
  },
  name: {
    color: '#223263',
    fontSize: 19,
    fontWeight: 'bold',
  },
  price: {
    color: '#40BFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  actionContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,
  },
  icon: {},
  addContainer: {
    flexDirection: 'row',
    marginRight: 5,
    backgroundColor: '#EBF0FF',
    marginBottom: 10,
  },
});

export default CartItems;
