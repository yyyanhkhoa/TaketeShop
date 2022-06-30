import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, ActivityIndicator, Text, Button} from 'react-native';
import CategoryHolder from '../../components/CategoryHolder';
import Card from '../../components/UI/Card';
import {PRODUCT_ITEMS_DUMMY_DATA} from '../../dummy_database/dummy-data';
import BannerPager from '../../components/BannerPager';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {CATEGORY_DETAIL_SCREEN} from '../../constants/NavigatorIndex';
import {useDispatch, useSelector} from 'react-redux';
import * as productActions from '../../store/actions/products';
import * as bannerActions from '../../store/actions/banner';
function HomePage(props) {
  const discountProducts = useSelector(
    state => state.products.discountProducts,
  );
  const recommenderProducts = useSelector(
    state => state.products.recommenderProducts,
  );
  const userID = useSelector(state => state.auth.userID);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      //await dispatch(productActions.fetchProductWithBannerID());
      await dispatch(bannerActions.fetchBanner());
      await dispatch(productActions.fetchCategory());
      await dispatch(productActions.fetchDiscountProducts({page: 0}));
      await dispatch(productActions.fetchRecommenderProducts(userID));
      await dispatch(productActions.fetchProducts({}));
      await dispatch(productActions.fetchUnit());
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    return navigation.addListener('focus', loadProducts);
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const onSelectedCategory = (id, type) =>
    navigation.navigate(CATEGORY_DETAIL_SCREEN, {categoryID: id, type: type});

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
        discountPrice:
          availableProducts[key].price -
          (availableProducts[key].discount / 100).toFixed(2) *
            availableProducts[key].price,
        unit: availableProducts[key].unit,
        image: availableProducts[key].image[0].image,
        category: availableProducts[key].category,
        provider: availableProducts[key].provider,
        liked: availableProducts[key].liked,
      });
    }
    return transformedShopItems.sort((a, b) =>
      a.discount < b.discount ? 1 : -1,
    );
  };

  return (
    <View>
      <BannerPager style={styles.banner}></BannerPager>
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <CategoryHolder
            onRefresh={loadProducts}
            onCategorySelect={() => {
              navigation.navigate(CATEGORY_DETAIL_SCREEN, {
                title: 'Giảm giá',
                type: 'DISCOUNT',
              });
            }}
            refreshing={isRefreshing}
            style={styles.bestSeller}
            title={'Giảm giá'}
            horizontal={true}
            numColum={1}
            itemList={shopItems(discountProducts)}
          />
        </Card>
        <Card style={styles.cardContainer}>
          <CategoryHolder
            onRefresh={loadProducts}
             onCategorySelect={() => {
                navigation.navigate(CATEGORY_DETAIL_SCREEN, {
                  title: 'Dành cho bạn',
                  type: 'RECOMMENDER',
                });
              }}
            refreshing={isRefreshing}
            style={styles.bestSeller}
            title={'Dành cho bạn'}
            horizontal={true}
            numColum={1}
            itemList={shopItems(recommenderProducts)}
          />
        </Card>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {
    backgroundColor: Colors.primaryColor,
  },
  banner: {
    height: 200,
  },
  cardContainer: {
    marginVertical: 5,
    elevation: 0,
    borderRadius: 0,
  },
  bestSeller: {
    height: '300%',
  },
  onSales: {
    height: '300%',
  },
  forYou: {
    height: '100%',
  },
});
export default HomePage;
