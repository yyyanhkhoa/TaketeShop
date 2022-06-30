import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CategoryHolder from '../../components/CategoryHolder';
import CategoryNameHolder from '../../components/CategoryNameHolder';
import {useNavigation} from '@react-navigation/native';
import {CATEGORY_DETAIL_SCREEN} from '../../constants/NavigatorIndex';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
function ShopPage(props) {
  const products = useSelector(state => state.products.availableProducts);
  const page = useSelector(state => state.products.page);

  const dispatch = useDispatch();
  const [categoryHolder, setCategoryHolder] = useState(
    useSelector(state => state.products.categories)[0],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigation();

  const loadCategory = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.updatePage(0))
      await dispatch(
        productActions.fetchProductsWithCategoryID({
          value: categoryHolder.categoryID,
          page: 0,
        }),
      );
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError, categoryHolder]);
  
  useLayoutEffect(() => {
    return navigation.addListener('focus', loadCategory);
  }, [loadCategory]);
  useEffect(() => {
    setIsLoading(true);
    loadCategory().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCategory]);

  const categoryItems = availableProducts => {
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
    return transformedShopItems;
  };

  const onClickCategoryHandler = async category => {
    setCategoryHolder(category);
  };

  return (
    <View style={{...styles.screen, ...props.style}}>
      <CategoryNameHolder
        style={styles.nameHolder}
        onSelect={onClickCategoryHandler}></CategoryNameHolder>
      <CategoryHolder
        onCategorySelect={() =>
          navigation.navigate(CATEGORY_DETAIL_SCREEN, {
            id: categoryHolder.categoryID,
            title: categoryHolder.name,
            type: 'NORMAL',
          })
        }
        onRefresh={loadCategory}
        refreshing={isRefreshing}
        style={styles.categoryHolder}
        title={categoryHolder.name}
        horizontal={false}
        numColum={2}
        itemList={categoryItems(products)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  screen: {
    flex: 1,
    flexDirection: 'row',
  },
  cardContainer: {
    marginVertical: 5,
    elevation: 0,
    borderRadius: 0,
  },
  nameHolder: {
    flex: 3,
  },
  categoryHolder: {
    flex: 10,
  },
});

export default ShopPage;
