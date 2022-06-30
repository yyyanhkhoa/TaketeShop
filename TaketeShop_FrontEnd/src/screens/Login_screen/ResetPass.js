import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
//import { useSelector, useDispatch } from 'react-redux';
import {TextInput, Button, Colors, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

function ResetPass() {
  const navigation = useNavigation();
  const [resetcode, setResetcode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmpassword, setConfirmpassword] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.maintext}>Thay đổi mật khẩu</Text>
      <Text style={styles.hidetext}>
        Mã thay đổi mật khẩu sẽ được gửi tới email của bạn, vui lòng truy cập
        email để lấy mã xác nhận{' '}
      </Text>

      <View style={styles.reset}>
        <TextInput
          style={{marginBottom: 10}}
          label="Reset code"
          mode="outlined"
          value={resetcode}
          onChangeText={resetcode => setResetcode(resetcode)}
        />
        <TextInput
          style={{marginBottom: 10}}
          label="New Password"
          mode="outlined"
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TextInput
          style={{marginBottom: 10}}
          label="Confirm password"
          mode="outlined"
          value={confirmpassword}
          onChangeText={confirmpassword => setConfirmpassword(confirmpassword)}
        />
      </View>
      <Button
        style={styles.button}
        mode="contained"
        color="#667eea"
        onPress={() => console.log('Pressed')}>
        Đổi mật khẩu
      </Button>
      <TouchableOpacity
        style={styles.containertext}
        onPress={() => navigation.popToTop()}>
        <Text style={styles.text2}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#ffff',
  },
  containertext: {
    top: 250,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  containertext2: {
    top: 260,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text1: {
    marginLeft: 100,
    color: 'black',
    fontSize: 20,
  },
  text2: {
    marginLeft: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 20,
  },
  maintext: {
    top: 50,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
  },
  hidetext: {
    top: 120,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9B9B9B',
  },
  reset: {
    top: 130,
  },
  button: {
    color: '#4f5160',
    top: 200,
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
});
export default ResetPass;
