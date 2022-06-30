import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import SearchPage from '../homeScreen/SearchPage';
import ShopPage from './ShopPage';
import Colors from '../../constants/Colors';
import { Searchbar } from 'react-native-paper';
import { SEARCH_BAR_HEIGHT } from '../../constants/fontsize';
import * as productActions from '../../store/actions/products'

function ShopMainScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  let typingTimeOutRef = useRef();

  const onChangeSearch = async query => {
    setSearchQuery(query);
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      console.log(query)
      dispatch(productActions.fetchProductsWithSearchKeyWords({value: query}));
    },500)
  };

  const Page =
    searchQuery === '' ? <ShopPage style={styles.page}/> : <SearchPage style={styles.page}/>;

  return (
    <View style={styles.screen}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Nhập để tìm..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        in></Searchbar>
       {Page}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  page: {
    flex: 23,
    height: '100%',
    width: '100%',
  },
  searchBar: {
    width: '100%',
    height: SEARCH_BAR_HEIGHT,
    borderRadius: 0,
    backgroundColor: Colors.primaryColor,
  },
});

export default ShopMainScreen;
