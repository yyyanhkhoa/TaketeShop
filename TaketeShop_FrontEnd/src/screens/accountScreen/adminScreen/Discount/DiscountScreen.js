import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { convertWeekToVietnamese, convertMonthToVietnamese } from '../../../../ulti/Ulti';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../../components/UI/Header';
import Colors from '../../../../constants/Colors';
import CalendarPicker from 'react-native-calendar-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import Card from '../../../../components/UI/Card';
import * as discountActions from '../../../../store/actions/discount';
import { LIST_DISCOUNT } from '../../../../constants/NavigatorIndex';

function DiscountScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.products.categories);
  const [categoryID, setCategoryID] = useState();
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState('');
  const [membership, setMembership] = useState(false);
  let check = 0 ;
  const [date, setDate] = useState('');
  const [displayDay, setDisplayDay] = useState([]);

  const onDateChange = async day => {
    await setDate(day);
  };

  const SQLDate = date => {
    return `${date[3]}-${convertMonthToVietnamese(date[1])}-${date[2]}`;
  };
  const showDate = date => {
    return `${convertWeekToVietnamese(date[0])} ${date[2]
      }/${convertMonthToVietnamese(date[1])}/${date[3]}`;
  };
 
  const AddDiscount = () => {
    if (membership) 
      check = 1 ;
    else check = 0;
    dispatch(discountActions.createDiscount(categoryID, voucher, discount, check, SQLDate(displayDay))) ;
    navigation.navigate(LIST_DISCOUNT);
  };

  useLayoutEffect(() => {
    setDisplayDay(date.toString().split(' '));
  }, [date]);
  return (
    <ScrollView style={styles.screen}>
      <Header title="Th??m gi???m gi??"></Header>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>M?? gi???m gi??: </Text>
        <TextInput
          label="Nh???p m?? voucher"
          style={{ backgroundColor: Colors.backgroundColor }}
          mode="outlined"
          value={voucher}
          onChangeText={txt => setVoucher(txt)}
        />
      </View>
      
      {/* Chon loai san pham */}
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Ch???n lo???i s???n ph???m s??? d???ng m?? gi???m gi??: </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={categoryList}
            maxHeight={130}
            labelField="name"
            valueField="categoryID"
            placeholder={'Lo???i s???n ph???m'}
            onChange={item => {
              setCategoryID(item.categoryID);
              console.log(item.categoryID);             
            }}
          />
        </View>       


      </View>
      {/* Discount */}
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Gi???m gi?? (%): </Text>
        <TextInput
          label="Nh???p t??? l??? gi???m gi??"
          style={{ backgroundColor: Colors.backgroundColor }}
          keyboardType="numeric"
          mode="outlined"
          value={discount}
          onChangeText={txt => setDiscount(txt)}
        />
      </View>

      {/* membership */}
      <View style={{
        padding: 10,
        flex: 14,
        backgroundColor: Colors.backgroundColor,
        flexDirection: 'row',
      }}>
        <Text style={styles.title}>Membership: </Text>
        <Checkbox
          status={membership ? 'checked' : 'unchecked'}
          color="#4086ef"
          onPress={() => {
            setMembership(!membership);
          }}
        />
      </View>


      {/* end date */}
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Ng??y h???t h???n: </Text>
        <TextInput
          disabled="false"
          style={{ backgroundColor: Colors.backgroundColor }}
          keyboardType="numeric"
          mode="outlined"
          value={date ? showDate(displayDay) : 'Vui l??ng ch???n ng??y'}
          onChangeText={txt => setDate(txt)}
        />
      </View>
      <View style={styles.calen}>
        <CalendarPicker
          weekdays={[
            'Ch??? nh???t',
            'Th??? hai',
            'Th??? ba',
            'Th??? t??',
            'Th??? n??m',
            'Th??? s??u',
            'Th??? b???y',
          ]}
          months={[
            'Th??ng M???t',
            'Th??ng Hai',
            'Th??ng Ba',
            'Th??ng T??',
            'Th??ng N??m',
            'Th??ng S??u',
            'Th??ng B???y',
            'Th??ng T??m',
            'Th??ng Ch??n',
            'Th??ng M?????i',
            'Th??ng M?????i M???t',
            'Th??ng M?????i Hai',
          ]}
          selectYearTitle={'Ch???n n??m'}
          selectMonthTitle={'Ch???n th??ng trong n??m '}
          previousTitle="Tr?????c"
          nextTitle="Sau"
          selectedDayColor={Colors.primaryColor}
          onDateChange={onDateChange}
        />
      </View>



      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          contentStyle={styles.buttonText}
          style={styles.button}
          color="#40bfff"
          labelStyle={{ fontSize: 20 }}
          onPress={() => {
            AddDiscount();
          }}>
          X??c nh???n
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffff',
  },

  inputContainer: {
    padding: 10,
    flex: 14,
    backgroundColor: Colors.backgroundColor,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 22,
    color: 'black',
  },
  dropdown: {
    marginTop: 10,
    height: 50,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
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
  imageList: {
    height: 100,
    marginTop: 10,
    width: '100%',
  },
  imageListContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    width: 90,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  addImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    width: 90,
  },

  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    marginTop: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
    marginHorizontal: 20,
    borderRadius: 40,
    color: '#4f5160',
  },
  button: {
    height: 50,
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
  calen: {
    flex: 14,
  },
  buttonText: {
    height: '100%',
  },
});
export default DiscountScreen;
