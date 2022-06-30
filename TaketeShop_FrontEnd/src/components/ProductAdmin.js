import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import { ADMIN_PRODUCT_DETAIL_SCREEN } from '../constants/NavigatorIndex';
import Card from './UI/Card';

function ProductAdmin(props) {
    const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate(ADMIN_PRODUCT_DETAIL_SCREEN, {id: props.item.productID})}}>
        <View style={{...styles.container, ...props.style}}>
          <View style={{flex: 1}}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: props.item.image[0].image,
                }}
              />
            </View>
          </View>
          <Text style={styles.title}>#{props.item.productID}: {props.item.name} - {props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Text>

          <Card style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {navigation.navigate(ADMIN_PRODUCT_DETAIL_SCREEN, {id: props.item.productID})}}>
              <Text style={styles.bottomText}>Chi tiết sản phẩm</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 5,
    borderWidth: 0.5
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 20
  },
  title: {
    fontSize: 17,
    justifyContent: 'flex-end',
    flex: 1,
    marginLeft: 10
  },
  price: {
    fontSize: 16,
  },
  bottomBar: {
    padding: 10,
    borderRadius: 0,
    elevation: 0,
    margin: 10,
    justifyContent: 'flex-end'
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default ProductAdmin;
