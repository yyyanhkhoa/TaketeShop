import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  ADDRESS_SCREEN,
  ADD_ADDRESS_SCREEN,
  ADD_COMMENT_SCREEN,
  ADMIN_NAVIGATOR,
  BOTTOM_BAR_NAVIGATOR,
  CATEGORY_DETAIL_SCREEN,
  COMMENT_SCREEN,
  LOGIN_NAVIGATOR,
  NOTIFICATION_SCREEN,
  PRODUCT_DETAIL_SCREEN,
  STARTUP_SCREEN,
  SUCCESS_SCREEN,
  WISHLIST_SCREEN,
  PAYMENT_SCREEN,
  ORDER_DETAIL_SCREEN,
  ADMIN_ORDER_NAVIGATOR,
  ORDER_ADMIN_DETAIL_SCREEN,
  ADMIN_PRODUCT_SCREEN,
  //PROFILE_NAVIGATOR_FOR_ADMIN,
} from '../constants/NavigatorIndex';
import BottomBarNavigator from './BottomBarNavigator';
import CategoryDetailScreen from '../screens/productScreen/CategoryDetailScreen';
import ProductDetailScreen from '../screens/productScreen/ProductDetailScreen';
import CommentScreen from '../screens/productScreen/CommentScreen';
import AddCommentScreen from '../screens/productScreen/AddCommentScreen';
import Colors from '../constants/Colors';
import LoginNavigator from './LoginNavigator';
import AddressScreen from '../screens/addressScreen/AddressScreen';
import AddAddressPage from '../screens/addressScreen/AddAddressPage';
import SuccessScreen from '../screens/addressScreen/SuccessScreen';
import NotificationScreen from '../screens/homeScreen/NotificationScreen';
//import ProfileNavigatorAdmin from './ProfileNavigatorAdmin';
import StartupScreen from '../screens/StartupScreen';
import WishlistScreen from '../screens/homeScreen/WishlistScreen';
import AdminNavigator from './AdminNavigator';
import PaymentScreens from '../screens/cartScreen/PaymentScreens';
import OrderDetailScreen from '../screens/orderScreen/OrderDetailScreen';
import OrderAdminNavigator from './OrderAdminNavigator';
import OrderAdminDetailScreen from '../screens/orderScreen/orderAdmin/OrderAdminDetailScreen';
import AdminProductScreen from '../screens/accountScreen/adminScreen/AdminProductScreen';

const StackNavigator = createNativeStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={STARTUP_SCREEN}
        options={{
          headerStyle: {
            backgroundColor: Colors.primaryColor,
          },
        }}>
        <StackNavigator.Screen
          name={STARTUP_SCREEN}
          component={StartupScreen}
          options={{
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={LOGIN_NAVIGATOR}
          component={LoginNavigator}
          options={{
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={BOTTOM_BAR_NAVIGATOR}
          component={BottomBarNavigator}
          options={{
            headerTitle: 'Home Page',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={WISHLIST_SCREEN}
          component={WishlistScreen}
          options={{
            headerTitle: 'Yêu Thích',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={CATEGORY_DETAIL_SCREEN}
          component={CategoryDetailScreen}
          options={{
            headerTitle: 'Detail Screen',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={PRODUCT_DETAIL_SCREEN}
          component={ProductDetailScreen}
          options={{
            headerTitle: 'Úm ba la Product Detail nè',
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={COMMENT_SCREEN}
          component={CommentScreen}
          options={{
            headerTitle: 'Đánh giá',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ADD_COMMENT_SCREEN}
          component={AddCommentScreen}
          options={{
            headerTitle: 'Viết đánh giá',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ADDRESS_SCREEN}
          component={AddressScreen}
          options={{
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ADD_ADDRESS_SCREEN}
          component={AddAddressPage}
          options={{
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={PAYMENT_SCREEN}
          component={PaymentScreens}
          options={{
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={SUCCESS_SCREEN}
          component={SuccessScreen}
          options={{
            headerTitle: 'Thêm Địa Chỉ',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ORDER_DETAIL_SCREEN}
          component={OrderDetailScreen}
          options={{
            headerTitle: 'Thêm Địa Chỉ',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ORDER_ADMIN_DETAIL_SCREEN}
          component={OrderAdminDetailScreen}
          options={{
            headerTitle: 'Thêm Địa Chỉ',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ADMIN_ORDER_NAVIGATOR}
          component={OrderAdminNavigator}
          options={{
            headerTitle: 'Quản lý đơn hàng Admin',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={NOTIFICATION_SCREEN}
          component={NotificationScreen}
          options={{
            headerTitle: 'Thông báo',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ADMIN_NAVIGATOR}
          component={AdminNavigator}
          options={{
            headerTitle: 'Admin',
            headerShown: false,
          }}></StackNavigator.Screen>

        <StackNavigator.Screen
          name={ADMIN_PRODUCT_SCREEN}
          component={AdminProductScreen}
          options={{
            headerTitle: 'Admin',
            headerShown: false,
          }}></StackNavigator.Screen>
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
