import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, TextInput} from 'react-native-paper';
import Rating from 'react-native-star-rating';
import Card from '../../components/UI/Card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import Header from '../../components/UI/Header';
import ImagePicker from 'react-native-image-crop-picker';
import * as commentActions from '../../store/actions/comment';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_DETAIL_SCREEN } from '../../constants/NavigatorIndex';
import { uploadImagesToCloudinary } from '../../ulti/Cloudinary';
function AddCommentScreen(props) {
  const [star, setStar] = useState(0);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState('');
  const [response, setResponse] = useState();
  const token = useSelector(state => state.auth.token);
  const product = useSelector(state => state.products.currentProduct);
  const userID = useSelector(state => state.auth.userID);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const onSetImageHandler = () => {
    console.log('--------------------------------');
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      setImages(images);
      console.log(Image.resolveAssetSource(images[0]).uri);
    });
  };
  const onConfirmHandler = () => {
    // const pictures = uploadImagesToCloudinary(images);
    // console.log(pictures);
    dispatch(
      commentActions.addComment({
        token: token,
        productID: product.productID,
        userID: userID,
        comment: comment,
        rating: star,
        // images: pictures? p,
      }),
    );
    navigation.navigate(PRODUCT_DETAIL_SCREEN, {id: product.productID});
  };
  return (
    <View style={styles.screen}>
      <Header title={'Viết đánh giá'} style={styles.header}></Header>
      <View style={{padding: 10}}>
        <Text style={styles.title}>Mức độ hài lòng</Text>
        <View style={styles.ratingContainer}>
          <Rating
            type={'star'}
            starSize={50}
            containerStyle={styles.rating}
            emptyStar={'star'}
            fullStar={'star'}
            halfStar={'star-half'}
            maxStars={5}
            rating={star}
            selectedStar={rate => setStar(rate)}
            emptyStarColor={'#EBF0FF'}
            fullStarColor={'#FFDF00'}
          />
          <Text style={styles.ratingCount}>{star}/5</Text>
        </View>
        <Text style={styles.title}>Cảm nghĩ của bạn</Text>
        <TextInput
          style={styles.commentInput}
          value={comment}
          mode={'outlined'}
          outlineColor={'#9098B1'}
          activeOutlineColor={'#9098B1'}
          multiline={true}
          placeholder={'Viết cảm nghĩ của bạn ở đây...'}
          onChangeText={text => setComment(text)}></TextInput>
        <Text style={styles.title}>Thêm ảnh</Text>
        <View>
          <FlatList
            data={images}
            horizontal={true}
            style={styles.imageList}
            renderItem={itemData => (
              <Card style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{uri: itemData.item.path}}></Image>
              </Card>
            )}
            ListFooterComponent={
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onSetImageHandler()}>
                <Card style={styles.addImageContainer}>
                  <AntDesign
                    style={styles.addIcon}
                    name="pluscircle"
                    color={'#9098B1'}
                    size={40}
                  />
                </Card>
              </TouchableOpacity>
            }></FlatList>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            contentStyle={styles.buttonText}
            style={styles.button}
            color={Colors.primaryColor}
            labelStyle={{fontSize: 20}}
            onPress={onConfirmHandler}>
            Xác nhận
          </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // padding: 10,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    marginHorizontal: 4,
  },
  ratingContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  rating: {
    flex: 4,
  },
  ratingCount: {
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 10,
    fontSize: 25,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  commentInput: {
    backgroundColor: Colors.backgroundColor,
  },
  imageList: {
    height: 100,
    width: '100%',
  },
  imageListContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    width: 90,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  addImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    width: 90,
  },
  buttonContainer: {
    margin: 10,
    marginTop: 100,
    flex: 1,
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
});
export default AddCommentScreen;
