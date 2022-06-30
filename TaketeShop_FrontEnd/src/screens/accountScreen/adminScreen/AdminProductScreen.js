import {useNavigation} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {View, StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Notification from '../../../components/Notification';
import ProductAdmin from '../../../components/ProductAdmin';
import Colors from '../../../constants/Colors';
import {SEARCH_BAR_HEIGHT} from '../../../constants/fontsize';
import * as productActions from '../../../store/actions/products';

function AdminProductScreen(props) {
  const dispatch = useDispatch();
  const availableProducts = useSelector(
    state => state.products.availableProducts,
  );

  const [searchQuery, setSearchQuery] = useState('');
  let typingTimeOutRef = useRef();

  const onChangeSearch = async query => {
    setSearchQuery(query);
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      console.log(query);
      dispatch(productActions.fetchProducts({}));
    }, 500);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigation();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch();
      // orderActions.fetchDeliveredOrdersWithUserID({id: userID, token: token}),
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useLayoutEffect(() => {
    return navigation.addListener('focus', loadProducts);
  }, [loadProducts]);
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

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
      <FlatList
        style={styles.productList}
        ListHeaderComponent={
          <View style={styles.headerBar}>
            <Searchbar
              style={styles.searchBar}
              placeholder="Nhập để tìm..."
              onChangeText={onChangeSearch}
              value={searchQuery}></Searchbar>
          </View>
        }
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={searchQuery? availableProducts.filter(item => item.name.includes(searchQuery)) : availableProducts}
        renderItem={itemData => <ProductAdmin item={itemData.item}></ProductAdmin>}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primaryColor,
  },
  productList: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  searchBar: {
    width: '100%',
    height: SEARCH_BAR_HEIGHT,
    backgroundColor: Colors.primaryColor,
  },
});

export default AdminProductScreen;
