import React from 'react';
import {
  Text, StyleSheet, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.maintext}>Quên mật khẩu</Text>
      <Text style={styles.hidetext}>
        Vui lòng nhập email để xác nhận tài khoản, mã xác nhận sẽ được gửi đến
        email của bạn
      </Text>

      <View style={styles.login}>
        <TextInput
          style={{ marginBottom: 10 }}
          label="Email"
          mode="outlined"
          value={email}
          style={{backgroundColor: Colors.backgroundColor}}

          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          contentStyle={styles.buttonText}
          style={styles.button}
          color={Colors.primaryColor}
          labelStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate('SuccesScreen')}>
          Đăng ký
        </Button>
      </View>

      <View style={styles.bottom} >

        <View style={styles.containertext}>
          <Text style={styles.text1}>Đã nhớ lại mật khẩu ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.text2}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containertext2}>
          <Text style={styles.text1}>Không có tài khoản ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.text2}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffff',
  },
  containertext: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  containertext2: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  text1: {
    marginLeft: 100,
    color: 'black',
    fontSize: 20,
  },
  text2: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    fontSize: 20,
  },
  maintext: {
    marginTop: 50,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
  },
  hidetext: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9B9B9B',
  },
  bottom: {
    flex: 1
  },
  login: {
    flex: 1,
    margin: 10,
  },
  buttonContainer: {
    margin: 5,
    borderRadius: 10,
    flex: 1
  },
  button: {
    height: 50,
    borderRadius: 5,
  },
  buttonText: {
    height: '100%',
  },
});
export default ForgotPassword;
