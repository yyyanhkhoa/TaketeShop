import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { BOTTOM_BAR_NAVIGATOR, HOME_MAIN_SCREEN } from '../../constants/NavigatorIndex';

function SuccessScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Header></Header>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="check-circle"
          color={Colors.iconColor}
          size={150}
        />
        <Text style={styles.title}>Thành công</Text>
        <Text style={styles.thankyou}>Cảm ơn vì đã sử dụng dịch vụ của chúng tôi</Text>
        <Button
          mode="contained"
          contentStyle={styles.buttonText}
          style={styles.button}
          color={Colors.iconColor}
          labelStyle={{fontSize: 20}}
          onPress={() => navigation.navigate(HOME_MAIN_SCREEN)}>
          Trờ về trang chủ
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  container:{
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
  title:{
      fontSize: 25,
      fontWeight: 'bold',
      color: '#223263',
      marginTop: 10
  },
  thankyou:{
    fontSize: 18,
    marginVertical: 10
  },
});

export default SuccessScreen;
