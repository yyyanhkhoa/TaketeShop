import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import FormText from '../accountScreen/FormText';
import CalendarPicker from 'react-native-calendar-picker';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import {
  convertWeekToVietnamese,
  convertMonthToVietnamese,
} from '../../ulti/Ulti';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as ListStaff from '../../store/actions/ListStaff';

function BirthScreen(props) {
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [displayDay, setDisplayDay] = useState([]);
  const dispatch = useDispatch();  
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.staff.admin);

  let userID;
  if (admin) {
    userID =useSelector(state => state.staff.userID);
  }else {
    userID = useSelector(state => state.auth.userID);
  };

  const onDateChange = async day => {
    await setDate(day);
  };

  const SQLDate = date => {
    return `${date[3]}-${convertMonthToVietnamese(date[1])}-${date[2]}`;
  };
  const showDate = date => {
    return `${convertWeekToVietnamese(date[0])} ${
      date[2]
    }/${convertMonthToVietnamese(date[1])}/${date[3]}`;
  };

  useLayoutEffect(() => {
    setDisplayDay(date.toString().split(' '));
  }, [date]);

  return (
    <View style={styles.screen}>
      <Header title="Thay đổi ngày sinh"></Header>
      <View style={styles.screen1}>
        <View style={styles.Daytextcontainer}>
          <Text style={styles.Daytext}>
            {date ? showDate(displayDay) : 'Vui lòng chọn ngày'}
          </Text>
        </View>

        <View style={styles.calen}>
          <CalendarPicker
            weekdays={[
              'Chủ nhật',
              'Thứ hai',
              'Thứ ba',
              'Thứ tư',
              'Thứ năm',
              'Thứ sáu',
              'Thứ bảy',
            ]}
            months={[
              'Tháng Một',
              'Tháng Hai',
              'Tháng Ba',
              'Tháng Tư',
              'Tháng Năm',
              'Tháng Sáu',
              'Tháng Bảy',
              'Tháng Tám',
              'Tháng Chín',
              'Tháng Mười',
              'Tháng Mười Một',
              'Tháng Mười Hai',
            ]}
            selectYearTitle={'Chọn năm'}
            selectMonthTitle={'Chọn tháng trong năm '}
            previousTitle="Trước"
            nextTitle="Sau"
            selectedDayColor={Colors.primaryColor}
            onDateChange={onDateChange}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          contentStyle={styles.buttonText}
          style={styles.button}
          color="#4F5160"
          labelStyle={{fontSize: 20}}
          onPress={() => {
             if (admin) {            
              dispatch(ListStaff.changeBirthday(userID, token, SQLDate(displayDay)));              
            }else {
              dispatch(authActions.changeBirthday(userID, token, SQLDate(displayDay)));              
            }           
            navigation.navigate('Profile');
          }}>
          Xác nhận
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  calen: {
    flex: 14,
  },
  screen1: {
    padding: 10,
    flex: 13,
  },
  Daytextcontainer: {
    backgroundColor: Colors.backgroundColor,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  Daytext: {
    left: 5,
    fontSize: 20,
    color: '#4f5160',
  },
  calendar: {},
  text: {
    fontSize: 40,
    color: 'black',
  },
  buttonContainer: {
    margin: 5,
    borderRadius: 40,

    color: '#4f5160',
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
});
export default BirthScreen;
