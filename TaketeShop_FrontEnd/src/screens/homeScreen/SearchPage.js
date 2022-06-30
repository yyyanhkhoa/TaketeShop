import {View, FlatList, Text, StyleSheet} from 'react-native';
import React from 'react';
import ShopItems from '../../components/ShopItems';
import Colors from '../../constants/Colors';
import {removeVietnameseTones} from '../../ulti/Ulti';
import {useSelector} from 'react-redux';
function SearchPage(props) {
  const products = useSelector(state => state.products.searchedProducts);

  if (!products.length)
    return (
      <View style={styles.screen}>
        <Text>Không tìm thấy sản phẩm...</Text>
      </View>
    );

  return (
    <View style={{...styles.screen, ...props.style}}>
      <FlatList
        keyExtractor={(item, index) => item.productID}
        style={styles.itemList}
        numColumns={2}
        data={products}
        extraData={props.keyword}
        refreshing={true}
        renderItem={itemData => (
          <ShopItems
            item={{
              productID: itemData.item.productID,
              categoryID: itemData.item.categoryID,
              name: itemData.item.name,
              price: itemData.item.price,
              quantity: itemData.item.quantity,
              discount: itemData.item.discount,
              discountPrice:
                itemData.item.price -
                (itemData.item.discount / 100).toFixed(2) * itemData.item.price,
              unit: itemData.item.unit,
              image: itemData.item.image[0].image,
              category: itemData.item.category,
              provider: itemData.item.provider,
              liked: itemData.item.liked,
            }}></ShopItems>
        )}></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  itemList: {
    flex: 1,
  },
});

export default SearchPage;
