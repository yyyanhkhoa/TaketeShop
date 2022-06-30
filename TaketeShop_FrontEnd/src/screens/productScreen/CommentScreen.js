import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Pressable
} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Comment from '../../components/Comment';
import Card from '../../components/UI/Card';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import {ADD_COMMENT_SCREEN} from '../../constants/NavigatorIndex';
const initialState = [false, false, false, false, false, false,]
function CommentScreen(props) {
  const comments = useSelector(state => state.comment.productComments);
  const navigation = useNavigation();
  const [filterState, setFilterState] = useState(0);
  const onAddCommentPress = () => {
    navigation.navigate(ADD_COMMENT_SCREEN);
  };
  const onFilterClickHandler = (mode) =>{
    setFilterState(mode);
  }
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const filter = mode => {
    switch (mode) {
      case 0: {
        return comments;
      }
      case 1: {
        return comments.filter(item => item.rating === 1);
      }
      case 2: {
        return comments.filter(item => item.rating === 2);
      }
      case 3: {
        return comments.filter(item => item.rating === 3);
      }
      case 4: {
        return comments.filter(item => item.rating === 4);
      }
      case 5: {
        return comments.filter(item => item.rating === 5);
      }
      default: {
        return comments;
      }
    }
  };
  return (
    <FlatList
      style={styles.screen}
      data={filter(filterState)}
      renderItem={itemData => <Comment data={itemData.item}></Comment>}
      ListHeaderComponent={
        <View style={{flex: 1}}>
          <Header title={'Đánh giá'}></Header>
          <ScrollView horizontal={true} style={styles.header}>
            <TouchableOpacity activeOpacity={1} onPress={() => onFilterClickHandler(0)}>
              <Card
                style={
                  filterState === 0
                    ? styles.filterClickedItems
                    : styles.filterItems
                }>
                <Text style={styles.filterText}>Tất cả</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1}  onPress={() => onFilterClickHandler(1)}>
              <Card
                style={
                  filterState === 1
                    ? styles.filterClickedItems
                    : styles.filterItems
                }>
                <Text style={styles.filterText}>1 Sao</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1}  onPress={() => onFilterClickHandler(2)}>
              <Card
                style={
                  filterState === 2
                    ? styles.filterClickedItems
                    : styles.filterItems
                }>
                <Text style={styles.filterText}>2 Sao</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1}  onPress={() => onFilterClickHandler(3)}>
              <Card
                style={
                  filterState === 3
                    ? styles.filterClickedItems
                    : styles.filterItems
                }>
                <Text style={styles.filterText}>3 Sao</Text>
              </Card>
            </TouchableOpacity>
            <View>
            <TouchableOpacity activeOpacity={1}  onPress={() => onFilterClickHandler(4)}>
              <Card
                style={
                  filterState === 4
                    ? styles.filterClickedItems
                    : styles.filterItems
                }>
                <Text style={styles.filterText}>4 Sao</Text>
              </Card>
            </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={1}  onPress={() => onFilterClickHandler(5)}>
              <Card
                style={
                  filterState === 5
                    ? styles.filterClickedItems
                    : styles.filterItems
                }>
                <Text style={styles.filterText}>5 Sao</Text>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </View>
      }
      ListFooterComponent={
        <View style={styles.bottomBar}>
          {/* <TouchableCmp onPress={onAddCommentPress} useForeground>
            <View style={styles.bottomButton}>
              <Text style={styles.bottomText}>Thêm Đánh Giá</Text>
            </View>
          </TouchableCmp> */}
          <Button onPress={onAddCommentPress} color={Colors.primaryColor}>
            Thêm đánh giá
          </Button>
        </View>
      }></FlatList>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    marginBottom: 10,
  },
  filterItems: {
    marginVertical: 10,
    marginLeft: 10,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
    borderWidth: 0.5
  },
  filterClickedItems: {
    marginVertical: 10,
    marginLeft: 10,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: "#97a832",
    borderWidth: 1
  },
  bottomBar: {
    flex: 1,
    height: 50,
    padding: 5,
    borderRadius: 0,
    marginVertical: 2,
  },
  filterText: {
    fontSize: 17,
    textAlign: 'center'
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    borderWidth: 1,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CommentScreen;
