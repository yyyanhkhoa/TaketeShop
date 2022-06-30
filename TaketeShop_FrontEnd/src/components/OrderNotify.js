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

function OrderNotify(props) {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableCmp useForeground>
        <View style={styles.touchable}>
            <View style={styles.imageContainer}>
                <Image style={styles.image}></Image>
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
    height: 150,
  },
  touchable: {
    padding: 10,
    flexDirection: 'row'
  },
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
      height: '100%',
      width: '100%'
  },
  contentContainer: {
      flex: 5,
      justifyContent: 'space-between'
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  descriptions: {
      fontSize: 15,
  },
  date:{
    fontSize: 13
  },
});
export default OrderNotify;
