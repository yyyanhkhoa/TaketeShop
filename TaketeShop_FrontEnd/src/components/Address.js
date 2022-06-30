import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import Header from './UI/Header';
import * as addressActions from '../store/actions/address';
import {useNavigation} from '@react-navigation/native';
import {ADD_ADDRESS_SCREEN} from '../constants/NavigatorIndex';
function Address(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const isSelectedBorder = props.item.isSelected ? Colors.iconColor : '#9098B1';
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          dispatch(addressActions.selectAddressItem(props.item.addressID))
        }>
        <View style={{...styles.container, borderColor: isSelectedBorder}}>
          <Text style={styles.title}>
            {props.item.name} ({props.item.gender ? 'Nam' : 'Nữ'})
          </Text>
          <Text style={styles.number}>{props.item.phone}</Text>
          <Text
            style={
              styles.address
            }>{`${props.item.street}, ${props.item.ward}, ${props.item.district}, ${props.item.province}`}</Text>
          <View style={styles.actionContainer}>
            {/* <Button
          mode="contained"
          contentStyle={styles.buttonText}
          style={styles.button}
          color={Colors.primaryColor}
          labelStyle={{fontSize: 15}}
          onPress={() => navigation.navigate(ADD_ADDRESS_SCREEN, {id: props.item.addressID})}>
          Sửa
        </Button> */}
            <IconButton
              icon={'delete-outline'}
              color={'#9098B1'}
              onPress={() =>
                dispatch(
                  addressActions.deleteAddressByID(token, props.item.addressID),
                )
              }></IconButton>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 2,
    padding: 15,
    margin: 15,
    marginVertical: 5,
  },
  title: {
    marginVertical: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#223263',
  },
  address: {
    marginVertical: 10,
    fontSize: 15,
  },
  number: {
    marginVertical: 10,
    fontSize: 15,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    height: 40,
  },
  buttonText: {
    height: '100%',
  },
});

export default Address;
