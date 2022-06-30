import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import {PRODUCT_DETAIL_SCREEN} from '../constants/NavigatorIndex';
import Card from './UI/Card';

function ShopItems(props) {
  const navigation = useNavigation();
  const onItemClick = () =>
    navigation.navigate(PRODUCT_DETAIL_SCREEN, {id: props.item.productID});
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={{...styles.screen, ...props.style}}>
      <Card style={styles.product}>
        <View style={{borderRadius: 5}}>
          <TouchableCmp onPress={onItemClick} useForeground>
            <View style={{padding: 10}}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.item.image}} />
              </View>
              <View style={styles.itemDescription}>
                <Text style={styles.textTitle}>{props.item.name}</Text>
                <Text style={styles.textPrice}>{props.item.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                <View style={styles.discount}>
                  <Text style={styles.textTruePrice}>
                    {props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/{props.item.unit}
                  </Text>
                  <Text style={styles.textDiscount}>
                    {' '}
                    {props.item.discount}% Off
                  </Text>
                </View>
              </View>
            </View>
          </TouchableCmp>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: 180,
    maxWidth: 220,
  },
  product: {
    flex: 1,
    margin: 5,
    elevation: 10,
  },

  imageContainer: {
    width: '100%',
    height: 130,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemDescription: {
    flex: 4,
  },

  discount: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textTitle: {
    height: 25,
    fontFamily: 'open-sans-bold',
    fontSize: 19,
    marginVertical: 5,
  },
  textPrice: {
    fontFamily: 'open-sans-bold',
    fontSize: 17,
    height: 25,
    color: Colors.iconColor,
    fontWeight: '900',
  },
  textTruePrice: {
    height: 25,
    textDecorationLine: 'line-through',
    fontFamily: 'open-sans-bold',
  },
  textDiscount: {
    height: 25,
    color: Colors.accentColor,
    fontFamily: 'open-sans-bold',
  },
});

export default ShopItems;
