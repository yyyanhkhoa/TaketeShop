import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#9098B1',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 5
  }
});

export default Card;
