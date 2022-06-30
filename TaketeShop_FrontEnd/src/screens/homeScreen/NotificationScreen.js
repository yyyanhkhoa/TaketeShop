import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Notification from '../../components/Notification';
import Header from '../../components/UI/Header';

function NotificationScreen(props) {
  return (
    <View style={styles.screen}>
      <Header title={'Thông báo'} back={true}></Header>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={itemData => <Notification></Notification>}></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {flex: 1},
});
export default NotificationScreen;
