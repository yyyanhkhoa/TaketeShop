import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import {SUCCESS_SCREEN} from '../../constants/NavigatorIndex';
import * as addressActions from '../../store/actions/address';

const dataGender = [
  {label: 'Nam', value: '1'},
  {label: 'Nữ', value: '0'},
];
function AddAddressPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const provinces = useSelector(state => state.address.provinces);
  const districts = useSelector(state => state.address.districts);
  const wards = useSelector(state => state.address.wards);
  const userID = useSelector(state => state.auth.userID);
  const token = useSelector(state => state.auth.token);

  const [street, setStreet] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [gender, setGender] = useState(dataGender[0]);
  const [address, setAddress] = useState({
    provinceID: null,
    districtID: null,
    wardID: null,
  });
  const [error, setError] = useState();
  // let flag = id;

  const loadProvinces = useCallback(async () => {
    setError(null);
    try {
      await dispatch(addressActions.fetchProvinces());
    } catch (err) {
      setError(err.msg);
    }
  });
  const loadDistricts = useCallback(async () => {
    setError(null);
    try {
      await dispatch(
        addressActions.fetchDistrictsWithProvinceID(address.provinceID),
      );
    } catch (err) {
      setError(err.msg);
    }
  });
  const loadWards = useCallback(async () => {
    setError(null);
    try {
      await dispatch(
        addressActions.fetchWardWithProvinceIDAndProvinceID(
          address.provinceID,
          address.districtID,
        ),
      );
    } catch (err) {
      setError(err.msg);
    }
  });

  useEffect(() => {
    if (!address.wardID) {
      if (!address.districtID) {
        if (!address.provinceID) {
          loadProvinces().then(() => {
            console.log('Fetch Provinces success');
          });
        } else {
          loadDistricts().then(() => {
            console.log('Fetch Districts success');
          });
        }
      } else {
        loadWards().then(() => {
          console.log('Fetch Wards success');
        });
      }
    }
  }, [dispatch, address]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Có lỗi, vui lòng thử lại</Text>
        <Button
          title="Thử lại"
          onPress={loadProvinces}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  const onCitySelect = option => {
    setAddress({
      provinceID: option,
      districtID: null,
      wardID: null,
    });
  };

  const onDistrictSelect = option => {
    setAddress({
      ...address,
      districtID: option,
      wardID: null,
    });
  };

  const onWardSelect = option => {
    setAddress({
      ...address,
      wardID: option,
    });
  };

  const validateInput = () => {
    //check Input Data ở đây
    return true;
  };

  const onConfirm = () => {
    if (validateInput()) {
      dispatch(
        addressActions.addAddress(
          token,
          userID,
          phone,
          address.provinceID,
          address.districtID,
          address.wardID,
          street,
          gender.value,
          name,
        ),
      );
    }
  };

  return (
    <View style={styles.screen}>
      <Header title={'Thêm địa chỉ'}></Header>
      <View style={styles.inputContainer}>
        <View style={styles.containerStyle}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={provinces}
            maxHeight={230}
            labelField="name"
            valueField="provinceID"
            placeholder={!isFocus ? 'Tỉnh/Thành Phố' : '...'}
            value={address.provinceID}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              onCitySelect(item.provinceID);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.containerStyle}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={districts}
            maxHeight={230}
            labelField="name"
            valueField="districtID"
            placeholder={!isFocus ? 'Quận/Huyện' : '...'}
            value={address.districtID}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              onDistrictSelect(item.districtID);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.containerStyle}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={wards}
            maxHeight={230}
            labelField="name"
            valueField="wardID"
            placeholder={!isFocus ? 'Phường/Xã' : '...'}
            value={address.wardID}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              onWardSelect(item.wardID);
              setIsFocus(false);
            }}
          />
        </View>
        <TextInput
          style={styles.address}
          label={'Địa chỉ'}
          mode="outlined"
          value={street}
          onChangeText={txt => setStreet(txt)}
          selectionColor={Colors.primaryColor}
          activeOutlineColor={Colors.primaryColor}
          outlineColor={Colors.primaryColor}
          underlineColorAndroid={Colors.primaryColor}></TextInput>
        <View style={styles.infoContainer}>
          <TextInput
            style={styles.address}
            label={'Tên'}
            mode="outlined"
            value={name}
            onChangeText={txt => setName(txt)}
            selectionColor={Colors.primaryColor}
            activeOutlineColor={Colors.primaryColor}
            outlineColor={Colors.primaryColor}
            underlineColorAndroid={Colors.primaryColor}></TextInput>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              style={styles.phone}
              label={'Số Điện Thoại'}
              mode="outlined"
              keyboardType="numeric"
              value={phone}
              onChangeText={num => setPhone(num)}
              selectionColor={Colors.primaryColor}
              activeOutlineColor={Colors.primaryColor}
              outlineColor={Colors.primaryColor}
              underlineColorAndroid={Colors.primaryColor}></TextInput>
            <Dropdown
              style={styles.gender}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // containerStyle={styles.gender}
              iconStyle={styles.iconStyle}
              data={dataGender}
              maxHeight={130}
              labelField="label"
              valueField="value"
              placeholder={'Giới tính...'}
              value={gender.value}
              onChange={item => {
                setGender(item);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          contentStyle={styles.buttonText}
          style={styles.button}
          color={Colors.iconColor}
          labelStyle={{fontSize: 20}}
          onPress={() => {
            onConfirm();
            navigation.navigate(SUCCESS_SCREEN);
          }}>
          Xác nhận
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  inputContainer: {
    padding: 10,
    flex: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    backgroundColor: Colors.backgroundColor,
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
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
  input: {
    backgroundColor: Colors.backgroundColor,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 5,
  },
  address: {
    backgroundColor: Colors.backgroundColor,
    marginTop: 10,
  },
  buttonContainer: {
    padding: 10,
    flex: 1,
    alignContent: 'flex-end',
  },
  phone:{
    backgroundColor: Colors.backgroundColor,
    marginTop: 10,
    flex: 2
  },
  gender:{
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 10,
    backgroundColor: Colors.backgroundColor,
    marginTop: 20,
    marginLeft: 10,
    flex: 1
  },
  button: {
    height: 50,
  },
  buttonText: {
    height: '100%',
  },
});

export default AddAddressPage;
