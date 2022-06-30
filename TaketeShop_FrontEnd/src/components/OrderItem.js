import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import { PRODUCT_DETAIL_SCREEN } from '../constants/NavigatorIndex';
import Card from './UI/Card';
function OrderItem(props) {
  const navigation = useNavigation();
  const onItemClick = () =>
    navigation.navigate(PRODUCT_DETAIL_SCREEN, {id: props.item.productID});
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onItemClick}>
      <View style={{...styles.container, ...props.style}}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.item.image}} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{props.item.name}</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.quantity}>x{props.item.quantity}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.discount}>{props.item.price}đ</Text>
              <Text style={styles.price}>  {props.item.discountPrice}đ</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: Colors.primaryColor,
    elevation: 0,
    flexDirection: 'row',
    margin: 5
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderWidth: 0.5,
    margin: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  detailContainer:{
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1
  },
  priceContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 17
  },
  quantity: {
    fontSize: 17
  },
  discount: {
    fontSize: 17,
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 17,
    color: Colors.accentColor,
    fontFamily: 'open-sans-bold',
  },
});
export default OrderItem;
