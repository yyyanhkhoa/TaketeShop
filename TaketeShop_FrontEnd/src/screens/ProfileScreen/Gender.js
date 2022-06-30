import React, {useState, useRoute} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {TextInput, Colors, IconButton, Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/UI/Header';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as ListStaff from '../../store/actions/ListStaff';

const data = [
  {label: 'Nam', value: '1'},
  {label: 'Nữ', value: '0'},
];

function Gender(props) {
  const [value, setValue] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();  
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.staff.admin);
  let userID;
  if (admin) {
    userID =useSelector(state => state.staff.userID);
  }else {
    userID = useSelector(state => state.auth.userID);
  }

  return (
    <View style={styles.screen}>
      <Header title="Thay đổi giới tính"></Header>
      <View style={styles.screen1}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={130}
          labelField="label"
          valueField="value"
          placeholder={'Chọn giới tính...'}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
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
              dispatch(ListStaff.changeGender(userID, token, value));                 
            }else {
              dispatch(authActions.changeGender(userID, token, value));              
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
    backgroundColor: '#ffff',
  },
  screen1: {
    padding: 10,
    flex: 14,
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
  dropdown: {
    top: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    backgroundColor: Colors.backgroundColor,
  },
  expand: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: '#FF9C40',
  },
  itemList: {
    flex: 4,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
export default Gender;
