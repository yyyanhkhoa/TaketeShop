import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  TextInput,
  Button,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  FORGOT_PASSWORD_SCREEN,
  BOTTOM_BAR_NAVIGATOR,
} from '../../constants/NavigatorIndex';
import ImageShow from '../../components/ImageShow';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

function LoginScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error + ', please try again!', [
        {text: 'Okay'},
      ]);
    }
  }, [error]);

  const authHandler = async () => {
    const action = authActions.login(
      username,
      password,
    );

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate(BOTTOM_BAR_NAVIGATOR);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/img_appLogo.png')}></Image>
      </View>
      <View>
        <View style={styles.containertextinput}>
          <TextInput
            label="Tên đăng nhập"
            mode="outlined"
            value={username}
            style={{backgroundColor: Colors.backgroundColor}}
            autoCapitalize="none"
            errorText="Định dạng tên đăng nhập không đúng"
            onChangeText={(txt) => setUsername(txt)}
            initialValue=""
          />

          <TextInput
            label="Mật khẩu"
            mode="outlined"
            value={password}
            secureTextEntry
            required
            minLength={5}
            style={{backgroundColor: Colors.backgroundColor}}
            autoCapitalize="none"
            errorText="Định dạng mật khẩu không đúng"
            onChangeText={(txt) => setPassword(txt)}
            initialValue=""

          />
        </View>
        <View style={styles.forgotpasscontainer}>
          <TouchableOpacity onPress={() => navigation.navigate(FORGOT_PASSWORD_SCREEN)}>
            <Text style={styles.press}> Quên mật khẩu ?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator
              ize="small"
              color={Colors.primary}></ActivityIndicator>
          ) : (
            <Button
              mode="contained"
              contentStyle={styles.buttonText}
              style={styles.button}
              color={Colors.primaryColor}
              labelStyle={{fontSize: 20}}
              onPress={authHandler}>
              Đăng nhập
            </Button>
          )}
        </View>

        <View style={styles.containertext}>
          <Text style={styles.text1}>Không có tài khoản ?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.text2}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.text3}>Đăng nhập với</Text>
        <View style={styles.ggfb}>
          <IconButton
            icon="google"
            color="red"
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="facebook"
            color="blue"
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundColor,
    padding: 10,
  },
  containertextinput: {
    padding: 15,
    paddingBottom: 5,
  },
  containertext: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text3: {
    color: 'black',
    fontSize: 20,
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
  imageContainer: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: '100%',
    height: '110%',
  },

  input: {
    elevation: 0,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  forgotpasscontainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
    marginRight: 5,
  },
  press: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
  },
  buttonContainer: {
    margin: 5,
    borderRadius: 20,
    color: '#4f5160',
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
  bottom: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  ggfb: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default LoginScreen;
