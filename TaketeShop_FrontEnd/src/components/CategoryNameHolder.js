import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';

import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import Card from './UI/Card';
import * as productActions from '../store/actions/products'

function CategoryNameHolder(props) {
  const products = useSelector(state => state.products.categories);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchCategory());
    } catch (err) {
      setError(err.msg);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('focus', loadProducts);

    return willFocusSub
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
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Không tìm thấy sản phẩm!</Text>
      </View>
    );
  }
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const onClickCategoryHandler = async category => {
    await props.onSelect(category);
  };
  return (
    <View style={{...styles.card, ...props.style}}>
      <FlatList
        data={products}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        renderItem={itemData => (
          <View>
            <Card style={styles.cardContainer}>
              <TouchableCmp
                onPress={() => onClickCategoryHandler(itemData.item)}
                useForeground>
                <View style={styles.touchSize}>
                  <Text style={styles.title}>{itemData.item.name}</Text>
                </View>
              </TouchableCmp>
            </Card>
          </View>
        )}></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    marginTop: 3,
    marginRight: 0,
  },
  cardContainer: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 0,
    height: '100%',
    width: '100%',
  },
  touchSize: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    flex: 1,
    fontFamily: 'open-sans-bold',
  },
});

export default CategoryNameHolder;
