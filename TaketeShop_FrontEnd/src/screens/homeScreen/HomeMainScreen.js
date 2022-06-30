import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import SearchPage from './SearchPage';
import HomePage from './HomePage';
import {SEARCH_BAR_HEIGHT} from '../../constants/fontsize';
import {useNavigation} from '@react-navigation/native';
import {
  NOTIFICATION_SCREEN,
  WISHLIST_SCREEN,
} from '../../constants/NavigatorIndex';
import * as productActions from '../../store/actions/products';
function HomeMainScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const [searchQuery, setSearchQuery] = React.useState('');
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

  const Page = searchQuery === '' ? <HomePage /> : <SearchPage />;

  const onNotifyClickHandler = () => navigation.navigate(NOTIFICATION_SCREEN);
  const onWishlistClickHandler = () => navigation.navigate(WISHLIST_SCREEN);

  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.headerBar}>
              <Searchbar
                style={styles.searchBar}
                placeholder="Nhập để tìm..."
                onChangeText={onChangeSearch}
                value={searchQuery}></Searchbar>
              <IconButton
                icon="cards-heart-outline"
                onPress={onWishlistClickHandler}
                color={Colors.iconColor}
              />
              <IconButton
                icon="bell-outline"
                onPress={onNotifyClickHandler}
                color={Colors.iconColor}
              />
            </View>
          </View>
        }
        ListFooterComponent={Page}></FlatList>
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
  searchBar: {
    width: '75%',
    height: SEARCH_BAR_HEIGHT,
    backgroundColor: Colors.primaryColor,
  },
});

export default HomeMainScreen;
