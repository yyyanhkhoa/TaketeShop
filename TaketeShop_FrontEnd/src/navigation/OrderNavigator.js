import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ORDER_CANCEL_PAGE,
  ORDER_CONFIRM_PAGE,
  ORDER_DELIVERED_PAGE,
  ORDER_DELIVERING_PAGE,
  ORDER_WAITING_PAGE,
} from '../constants/NavigatorIndex';
import OrderCancelPage from '../screens/orderScreen/OrderCancelPage';
import OrderDeliveringPage from '../screens/orderScreen/OrderDeliveringPage';
import OrderDeliveredPage from '../screens/orderScreen/OrderDeliveredPage';
import OrderConfirmPage from '../screens/orderScreen/OrderConfirmPage';
import Header from '../components/UI/Header';
import Colors from '../constants/Colors';
import OrderWaitingPage from '../screens/orderScreen/OrderWaitingPage';

const Tab = createMaterialTopTabNavigator();
function OrderNavigator() {
  return (
    <View style={{flex: 1}}>
      <Header title={'Đơn Hàng'} back={true}></Header>
      <Tab.Navigator
        initialRouteName={ORDER_WAITING_PAGE}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {fontSize: 14},
          tabBarStyle: {backgroundColor: Colors.backgroundColor, height: 50, width: '100%',},
        }}>
        <Tab.Screen
          name={ORDER_WAITING_PAGE}
          component={OrderWaitingPage}
          options={{tabBarLabel: 'Chờ xác nhận',}}
        />
        <Tab.Screen
          name={ORDER_CONFIRM_PAGE}
          component={OrderConfirmPage}
          options={{tabBarLabel: 'Đã xác nhận'}}
        />
        <Tab.Screen
          name={ORDER_DELIVERING_PAGE}
          component={OrderDeliveringPage}
          options={{tabBarLabel: 'Đang giao'}}
        />
        <Tab.Screen
          name={ORDER_DELIVERED_PAGE}
          component={OrderDeliveredPage}
          options={{tabBarLabel: 'Đã giao'}}
        />
        <Tab.Screen name={ORDER_CANCEL_PAGE} component={OrderCancelPage} options={{tabBarLabel: 'Đã hủy'}} />
      </Tab.Navigator>
    </View>
  );
}

export default OrderNavigator;
