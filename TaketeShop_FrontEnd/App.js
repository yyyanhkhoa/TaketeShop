import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {LogBox, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator.js';
import productReducer from './src/store/reducers/products';
import authReducer from './src/store/reducers/auth';
import bannerReducer from './src/store/reducers/banner';
import chanelReducer from './src/store/reducers/chanel';
import commentReducer from './src/store/reducers/comment';
import StaffReducer from './src/store/reducers/ListStaff';
import cartReducer from './src/store/reducers/cart';
import addressReducer from './src/store/reducers/address';
import orderReducer from './src/store/reducers/order';
import discountReducer from './src/store/reducers/discount';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  banner: bannerReducer,
  discount : discountReducer ,
  chanel: chanelReducer,
  comment: commentReducer,
  staff: StaffReducer,
  address: addressReducer,
  cart: cartReducer,
  order: orderReducer,
  //messager : messagerReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" animated={true} showHideTransition={'fade'} />
      <AppNavigator></AppNavigator>
    </Provider>
  );
}

export default App;
