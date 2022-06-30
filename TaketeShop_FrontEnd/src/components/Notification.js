import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
const IMAGE_TEMP =
  'https://cms.dmpcdn.com/article/2021/04/02/a1ca8540-936b-11eb-8b27-db7c51a78b67_original.jpg';
function Notification(props) {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableCmp useForeground>
        <View style={styles.touchable}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: IMAGE_TEMP}}></Image>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Title</Text>
            <View>
              <Text style={styles.descriptions}>
                Descriptionssssssssssssssssssssssssssssssss
              </Text>
              <Text style={styles.descriptions}>Dateee</Text>
            </View>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: Colors.backgroundColor
  },
  touchable: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor
  },
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
    marginRight: 5
  },
  image: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    flex: 4,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  descriptions: {
    fontSize: 15,
  },
  date:{
    fontSize: 13
  },
});
export default Notification;
