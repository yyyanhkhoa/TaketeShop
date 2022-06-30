import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ShopItems from '../../components/ShopItems';
import Header from '../../components/UI/Header';
import * as productAction from '../../store/actions/products';
function WishlistScreen(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const wishlist = useSelector(state => state.products.wishlistProducts);
  const userID = useSelector(state => state.auth.userID);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const loadWishlist = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productAction.fetchWishListProducts({userID: userID,page: 0}));
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    return navigation.addListener('focus', loadWishlist);
  }, [loadWishlist]);

  useEffect(() => {
    setIsLoading(true);
    loadWishlist().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadWishlist]);

  if (!wishlist.length) {
    return (
      <View style={styles.screen}>
        <Header title={'Yêu thích'}></Header>
        <View style={styles.centered}>
          <Text>Bạn đang không có sản phẩm yêu thích!</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Có lỗi, vui lòng thử lại</Text>
        <Button
          title="Thử lại"
          onPress={loadWishlist}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  const shopItems = availableProducts => {
    const transformedShopItems = [];
    for (const key in availableProducts) {
      transformedShopItems.push({
        productID: availableProducts[key].productID,
        categoryID: availableProducts[key].categoryID,
        name: availableProducts[key].name,
        price: availableProducts[key].price,
        quantity: availableProducts[key].quantity,
        discount: availableProducts[key].discount,
        discountPrice: availableProducts[key].discountPrice,
        unit: availableProducts[key].unit,
        image: availableProducts[key].image[0].image,
        liked: availableProducts[key].liked,
      });
    }
    return transformedShopItems;
  };
  return (
    <View style={styles.screen}>
      <Header title={'Yêu thích'}></Header>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={loadWishlist}
        keyExtractor={(item, index) => item.productID}
        style={styles.itemList}
        numColumns={2}
        data={wishlist}
        renderItem={itemData => (
          <ShopItems item={itemData.item}></ShopItems>
        )}></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  screen: {flex: 1},
});
export default WishlistScreen;
