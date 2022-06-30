import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Countdown from 'react-native-countdown-component';
import Colors from '../../constants/Colors';
import {CATEGORY_DETAIL_SCREEN} from '../../constants/NavigatorIndex';
import {useDispatch, useSelector} from 'react-redux';
import * as productActions from '../../store/actions/products';
//import * as bannerActions from '../../store/actions/banner';

function Banner(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onClickHandler = async (id, type) => {

    console.log("bannerID: "+id); 
    await dispatch(productActions.fetchProductWithBannerID(id));   
    navigation.navigate(CATEGORY_DETAIL_SCREEN, {id: id, type: type, title: props.title});
  }
  const endTime = () => {
    const endDate = new Date(props.endTime);
    const now = new Date();
    return (endDate.getTime() / 1000) -(now.getTime()/1000);
  }
  return (
    <TouchableOpacity
      style={{...styles.container, ...props.style}}
      activeOpacity={1}
      onPress={() => {              
        onClickHandler(props.id, "BANNER")        
      }}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: props.image,
        }}>
        <View style={styles.description}>
          <Text style={styles.title}>{props.title.toUpperCase()}</Text>
          <Text style={styles.discount}> GIẢM {props.discount}%</Text>
          <View style={styles.countdownContainer}>
            <Countdown
              until={endTime()}
              timeToShow={['D', 'H', 'M', 'S']}
              timeLabels={{m: '', h: '', s: '', d: ''}}
              digitStyle={styles.countdownDigit}
              digitTxtStyle={styles.countdownTxT}></Countdown>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    flex: 1,
    height: '100%',
    width: '100%',
    textAlign: 'left',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: '2%',
    marginTop: '10%',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'open-sans-bold',
    textShadowColor: 'black',
    textShadowOffset: {height: 3, width: 3},
    textShadowRadius: 1,
  },
  discount: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'open-sans-bold',
    textShadowColor: 'black',
    textShadowOffset: {height: 3, width: 3},
    textShadowRadius: 1,
  },
  countdownContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  countdownDigit: {
    height: 50,
    width: 40,
    backgroundColor: 'white',
    borderColor: Colors.primaryColor,
    borderWidth: 2,
  },
  countdownTxT: {
    color: Colors.primaryColor,
    fontSize: 20,
  },
});
export default Banner;
