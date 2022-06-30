import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import Header from '../../../components/UI/Header';
import {
  convertWeekToVietnamese,
  convertMonthToVietnamese,
} from '../../../ulti/Ulti';
import Card from '../../../components/UI/Card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as authActions from '../../../store/actions/auth';

const dataGender = [
  { label: 'Nam', value: '1' },
  { label: 'Nữ', value: '0' },
];

function AddStaff() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showBirth, setShowBirth] = React.useState(false);
  const [displayDay, setDisplayDay] = React.useState([]);

  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    gender: '',
    birthday: '',
    phone: '',
    avatar: '',
  });

  const onDateChange = async day => {
    await setUser({ ...user, birthday: day });
  };

  const SQLDate = (date) => {
    return `${date[3]}-${convertMonthToVietnamese(date[1])}-${date[2]
      }`
  }

  const showDate = date => {
    return `${convertWeekToVietnamese(date[0])} ${date[2]
      }/${convertMonthToVietnamese(date[1])}/${date[3]}`;
  };

  useLayoutEffect(() => {
    setDisplayDay(user.birthday.toString().split(' '));
  }, [user.birthday]);

  const checkSignUp = () => {
    if (!user.username) {
      alert('Vui lòng nhập tên đăng nhập');
    } else if (!user.name) {
      alert('Vui lòng nhập tên định danh');
    } else if (!user.gender) {
      alert('Vui lòng chọn giới tính');
    } else if (!user.birthday) {
      alert('Vui lòng chọn ngày sinh');
    } else if (!user.phone) {
      alert('Vui lòng nhập số điện thoại');
    } else if (!user.password) {
      alert('Vui lòng nhập mật khẩu');
    } else if (!user.confirmPassword) {
      alert('Vui lòng nhập mật khẩu xác nhận');
    } else if (!user.email) {
      alert('Vui lòng nhập email');
    } else if (user.password !== user.confirmPassword) {
      alert('Xác nhận mật khẩu không chính xác, vui lòng nhập lại');
    } else {
      dispatch(
        authActions.signup(
          user.username,
          user.password,
          user.name,
          SQLDate(displayDay),
          user.gender,
          user.email,
          user.phone,
          'STAFF',
        ),
      );
      navigation.navigate('SuccesScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thêm nhân viên mới"></Header>
      <ScrollView style={styles.signup}>      

        <TextInput
          style={{ marginBottom: 10, backgroundColor: Colors.backgroundColor }}
          label="Tên đăng nhập"
          mode="outlined"
          value={user.username}
          onChangeText={txt => setUser({ ...user, username: txt })}
        />
        <TextInput
          style={{ marginBottom: 10, backgroundColor: Colors.backgroundColor }}
          label="Mật khẩu"
          mode="outlined"
          secureTextEntry={true}
          value={user.password}
          onChangeText={txt => setUser({ ...user, password: txt })}
        />
        <TextInput
          style={{ marginBottom: 10, backgroundColor: Colors.backgroundColor }}
          label="Xác nhận mật khẩu"
          secureTextEntry={true}
          mode="outlined"
          value={user.confirmPassword}
          onChangeText={txt => setUser({ ...user, confirmPassword: txt })}
        />
        <TextInput
          style={{ marginBottom: 10, backgroundColor: Colors.backgroundColor }}
          label="Email"
          mode="outlined"
          value={user.email}
          onChangeText={txt => setUser({ ...user, email: txt })}
        />
        <TextInput
          style={{ marginBottom: 10, backgroundColor: Colors.backgroundColor }}
          label="Họ và tên "
          mode="outlined"
          value={user.name}
          onChangeText={txt => setUser({ ...user, name: txt })}
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={dataGender}
            maxHeight={130}
            labelField="label"
            valueField="value"
            placeholder={'Giới tính...'}
            value={user.gender}
            onChange={item => {
              setUser({ ...user, gender: item.value });
            }}
          />
          <View style={{ flex: 1.8 }}>
            <TouchableOpacity onPress={() => setShowBirth(!showBirth)}>
              <View style={styles.birthday}>
                <Text style={{ fontSize: 17 }}>
                  {user.birthday
                    ? showDate(displayDay)
                    : 'Ngày sinh'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Show calendar */}

        {showBirth ? (
          <View>
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
              selectedDayColor={'#4F5160'}
              onDateChange={onDateChange}
            />
          </View>
        ) : null}
        <TextInput
          style={{ marginBottom: 10, backgroundColor: Colors.backgroundColor }}
          keyboardType="numeric"
          label="Số điện thoại "
          mode="outlined"
          value={user.phone}
          onChangeText={txt => setUser({ ...user, phone: txt })}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => console.log('Adddddd')}>
          <Card style={styles.addImageContainer}>
            <AntDesign
              style={styles.addIcon}
              name="pluscircle"
              color={'#9098B1'}
              size={40}
            />
          </Card>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            contentStyle={styles.buttonText}
            style={styles.button}
            color="#4f5160"
            labelStyle={{ fontSize: 20 }}
            onPress={checkSignUp}>
            Đăng ký nhân viên mới
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
  },
  addImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    width: 90,
  },
  containertext: {
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
    color: Colors.primaryColor,
    fontSize: 20,
  },
  maintext: {
    top: 10,
    margin: 10,
    marginLeft: 0,
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
  },
  signup: {
    marginVertical : 10 ,    
    paddingHorizontal: 15,
  },
  hidetext: {
    top: 120,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9B9B9B',
  },
  dropdown: {
    marginBottom: 10,
    marginRight: 10,
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 5,
    flex: 1,
  },
  birthday: {
    marginBottom: 10,
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 17,
  },
  selectedTextStyle: {
    fontSize: 17,
  },
  buttonContainer: {
    marginVertical: 5,
    borderRadius: 20,
    color: '#4f5160',
  },
  button: {
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    height: '100%',
    width: '100%',
  },

  Daytextcontainer: {
    backgroundColor: '#f6f6f6',
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
});

export default AddStaff;
