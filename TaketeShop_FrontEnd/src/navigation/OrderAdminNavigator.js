import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ORDER_ADMIN_CANCEL_PAGE,
  ORDER_ADMIN_CONFIRM_PAGE,
  ORDER_ADMIN_DELIVERED_PAGE,
  ORDER_ADMIN_DELIVERING_PAGE,
  ORDER_ADMIN_WAITING_PAGE,
} from '../constants/NavigatorIndex';
import Header from '../components/UI/Header';
import Colors from '../constants/Colors';
import OrderAdminWaitingPage from '../screens/orderScreen/orderAdmin/OrderAdminWaitingPage';
import OrderAdminConfirmPage from '../screens/orderScreen/orderAdmin/OrderAdminConfirmPage';
import OrderAdminDeliveredPage from '../screens/orderScreen/orderAdmin/OrderAdminDeliveredPage';
import OrderAdminDeliveringPage from '../screens/orderScreen/orderAdmin/OrderAdminDeliveringPage';
import OrderAdminCancelPage from '../screens/orderScreen/orderAdmin/OrderAdminCancelPage';
import { useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
function OrderAdminNavigator(props) {
  const statusIndex = useRoute().params.status;
  function convertOrderStatusToNavigatorIndex(status) {
    switch (status) {
      case 'WAITING':
        return ORDER_ADMIN_WAITING_PAGE;
      case 'CONFIRMED':
        return ORDER_ADMIN_CONFIRM_PAGE;
      case 'DELIVERING':
        return ORDER_ADMIN_DELIVERING_PAGE;
      case 'DELIVERED':
        return ORDER_ADMIN_DELIVERED_PAGE;
      case 'CANCEL':
        return ORDER_ADMIN_CANCEL_PAGE;
      default:
        return ORDER_ADMIN_WAITING_PAGE;
    }
  }
  return (
    <View style={{flex: 1}}>
      <Header title={'Quản lý đơn Hàng'}></Header>
      <Tab.Navigator
        initialRouteName={convertOrderStatusToNavigatorIndex(statusIndex)}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {fontSize: 14},
          tabBarStyle: {
            backgroundColor: Colors.backgroundColor,
            height: 50,
            width: '100%',
          },
        }}>
        <Tab.Screen
          name={ORDER_ADMIN_WAITING_PAGE}
          component={OrderAdminWaitingPage}
          options={{tabBarLabel: 'Chờ xác nhận'}}
        />
        <Tab.Screen
          name={ORDER_ADMIN_CONFIRM_PAGE}
          component={OrderAdminConfirmPage}
          options={{tabBarLabel: 'Đã xác nhận'}}
        />
        <Tab.Screen
          name={ORDER_ADMIN_DELIVERING_PAGE}
          component={OrderAdminDeliveringPage}
          options={{tabBarLabel: 'Đang giao'}}
        />
        <Tab.Screen
          name={ORDER_ADMIN_DELIVERED_PAGE}
          component={OrderAdminDeliveredPage}
          options={{tabBarLabel: 'Đã giao'}}
        />
        <Tab.Screen
          name={ORDER_ADMIN_CANCEL_PAGE}
          component={OrderAdminCancelPage}
          options={{tabBarLabel: 'Đã hủy'}}
        />
      </Tab.Navigator>
    </View>
  );
}

export default OrderAdminNavigator;
