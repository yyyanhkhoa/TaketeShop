import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import Colors from '../../constants/Colors';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {!props.back ? (
          <IconButton
            icon={'arrow-left'}
            color={'white'}
            size={25}
            onPress={() => navigation.goBack()}></IconButton>
        ) : <View style={{margin: 5}}></View>}
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.headerRight}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Colors.primaryColor,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  headerRight: {
    alignSelf: 'center',
  },
});

export default Header;
