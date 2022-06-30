import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ADMIN_ADD_PRODUCT_SCREEN, ADMIN_PRODUCT_DETAIL_SCREEN, 
         ADMIN_SCREEN,BANNER_SCREEN,DISCOUNT_SCREEN,FIX_BANNER,
         LIST_BANNER, LIST_DISCOUNT, FIX_DISCOUNT } from '../constants/NavigatorIndex';
import AdminMainScreen from '../screens/accountScreen/adminScreen/AdminMainScreen';
import AdminProductDetailScreen from '../screens/accountScreen/adminScreen/AdminProductDetailScreen';
import AdminProductScreen from '../screens/accountScreen/adminScreen/AdminProductScreen';
import DiscountScreen from '../screens/accountScreen/adminScreen/Discount/DiscountScreen';
import ListBanner from '../screens/accountScreen/adminScreen/Banner/ListBanner';
import ListDiscount from '../screens/accountScreen/adminScreen/Discount/ListDiscount';
import FixBanner from '../screens/accountScreen/adminScreen/Banner/FixBanner';
import BannerScreen from '../screens/accountScreen/adminScreen/Banner/BannerScreen';
import FixDiscount from '../screens/accountScreen/adminScreen/Discount/FixDiscount';

const StackNavigator = createNativeStackNavigator();
function AdminNavigator() {
  return <StackNavigator.Navigator initialRouteName={ADMIN_SCREEN} screenOptions={{ headerShown: false }}>
    <StackNavigator.Screen name={ADMIN_SCREEN} component={AdminMainScreen} />
    <StackNavigator.Screen name={ADMIN_ADD_PRODUCT_SCREEN} component={AdminProductScreen} />
    <StackNavigator.Screen name={ADMIN_PRODUCT_DETAIL_SCREEN} component={AdminProductDetailScreen} />
    <StackNavigator.Screen name={BANNER_SCREEN} component={BannerScreen} />
    <StackNavigator.Screen name={LIST_BANNER} component={ListBanner} />
    <StackNavigator.Screen name={FIX_BANNER} component={FixBanner} />

    <StackNavigator.Screen name={DISCOUNT_SCREEN} component={DiscountScreen} />    
    <StackNavigator.Screen name={LIST_DISCOUNT} component={ListDiscount} />
    <StackNavigator.Screen name={FIX_DISCOUNT} component={FixDiscount} />
  </StackNavigator.Navigator>;
}

export default AdminNavigator;
