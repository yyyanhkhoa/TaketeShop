import React, {useLayoutEffect} from 'react';
import {Card} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, FlatList, View, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import ShopItems from './ShopItems';
function CategoryHolder(props) {
  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onCategorySelect}>
        <View style={styles.header}>
          <Text style={styles.title}> {props.title}</Text>
          <Text style={styles.expand}>Xem thêm... </Text>
        </View>
      </TouchableOpacity>
      <FlatList
        extraData={props.extraData}
        onRefresh={props.onRefresh}
        keyExtractor={(item, index) => item.productID}
        style={styles.itemList}
        refreshing={props.refreshing}
        horizontal={props.horizontal}
        numColumns={props.numColum}
        data={props.itemList}
        renderItem={itemData => (
          <ShopItems item={itemData.item}></ShopItems>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: Colors.primaryColor,
  },
  expand: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: '#FF9C40',
  },
  itemList: {
    flex: 4,
  },
});

export default CategoryHolder;
