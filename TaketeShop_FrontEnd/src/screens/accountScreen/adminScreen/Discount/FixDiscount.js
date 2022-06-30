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
import * as discountActions from '../../../../store/actions/discount';
import { LIST_DISCOUNT } from '../../../../constants/NavigatorIndex';

function FixDiscount() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const categoryList = useSelector(state => state.products.categories);
    const ID = useSelector(state => state.discount.id);
    const [categoryID, setCategoryID] = useState(useSelector(state => state.discount.categoryId));
    const [voucher, setVoucher] = useState(useSelector(state => state.discount.voucher));
    const [discount, setDiscount] = useState(useSelector(state => state.discount.discountN));
    const [check, setCheck] = useState(useSelector(state => state.discount.membership));
    const [membership, setMembership] = useState((check == 1) ? true : false);
    const [date, setDate] = useState('');
    let currentDay = useSelector(state => state.discount.endTime);
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
    const FixDiscount = () => {   
        setCheck(!check) ;
        if (!date) {
            dispatch(discountActions.fixDiscount(ID, categoryID, voucher, discount, check));           
        } else {
            dispatch(discountActions.fixDiscountWithDay(ID, categoryID, voucher, discount, check, SQLDate(displayDay)));
        }
        dispatch(discountActions.fetchDiscount());
        navigation.navigate(LIST_DISCOUNT);
    };

    useLayoutEffect(() => {
        setDisplayDay(date.toString().split(' '));
    }, [date]);


    return (
        <ScrollView style={styles.screen}>
            <Header title="Sửa mã giảm giá"></Header>

            <View style={styles.inputContainer}>
                <Text style={styles.title}>ID mã giảm giá: {ID} </Text>
                <Text style={styles.title}>Mã giảm giá: </Text>
                <TextInput
                    label="Nhập mã voucher"
                    style={{ backgroundColor: Colors.backgroundColor }}
                    mode="outlined"
                    value={voucher}
                    onChangeText={txt => setVoucher(txt)}
                />
            </View>

            {/* Chon loai san pham */}
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Chọn loại sản phẩm sử dụng mã giảm giá: </Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={categoryList}
                        maxHeight={130}
                        labelField="name"
                        valueField="categoryID"
                        placeholder={categoryList[categoryID - 1].name}
                        onChange={item => {
                            setCategoryID(item.categoryID);                           
                        }}
                    />
                </View>


            </View>
            {/* Discount */}
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Giảm giá (%): </Text>
                <TextInput
                    label="Nhập tỉ lệ giảm giá"
                    style={{ backgroundColor: Colors.backgroundColor }}
                    keyboardType="numeric"
                    mode="outlined"
                    value={discount.toString()}
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
                        if (check == 0)
                            setCheck(1)
                        else setCheck(0);
                        setMembership(!membership);                        
                    }}
                />
            </View>


            {/* end date */}
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Ngày hết hạn: </Text>
                <TextInput
                    disabled="false"
                    style={{ backgroundColor: Colors.backgroundColor }}
                    keyboardType="numeric"
                    mode="outlined"
                    value={date ? showDate(displayDay) : currentDay}
                    onChangeText={txt => setDate(txt)}
                />
            </View>
            <View style={styles.calen}>
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
                        FixDiscount();
                    }}>
                    Xác nhận
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
export default FixDiscount;
