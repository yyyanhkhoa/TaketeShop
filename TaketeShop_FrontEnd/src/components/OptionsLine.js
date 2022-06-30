import React from 'react';
import {Alert, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import Card from './UI/Card';
function OptionsLine(props) {
  const onPressHandler = () => {
    if (props.confirmMessage) {
      Alert.alert('Xác nhận', props.confirmMessage, [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Đúng', onPress: props.onPress},
      ]);
    } else {
      props.onPress();
    }
  };
  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={0.8}>
      <Card style={{...styles.container, ...props.style}}>
        <MaterialCommunityIcons
          name={props.icon}
          color={Colors.iconColor}
          size={26}
        />
        <Text style={{...styles.textStyle, ...props.textStyle}}>
          {props.title}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    elevation: 0,
    borderBottomWidth: 0.1,
  },
  textStyle: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 18,
  },
});

export default OptionsLine;
