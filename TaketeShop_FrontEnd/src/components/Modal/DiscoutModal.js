import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function DiscountModal(props) {
    console.log('asdfsadf')

  return (
    <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

              <Text style={styles.textStyle}>Hide Modal</Text>
          </View>
        </View>
  );
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default DiscountModal;
