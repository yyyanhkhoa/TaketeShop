import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';

function Form1(props) {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableCmp onPress={props.onPress}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name={props.icons}
            color={Colors.iconColor}
            size={40}
          />
          <Text>{props.titletext}</Text>
          <View style={styles.expandContainer}>
            <Text>{props.titletext2}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color={Colors.iconColor}
              size={40}
            />
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: '#ffff',
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 1,
  },
  expandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text2: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'open-sans-bold',
    textShadowRadius: 1,
    alignItems: 'flex-start',
  },
  text: {
    // color: 'black',
    color: '#2196f3',
    fontSize: 20,
    fontWeight: '900',
    justifyContent: 'space-between',
    fontFamily: 'open-sans-bold',
    textShadowRadius: 1,
  },
});

export default Form1;
