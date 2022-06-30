import React, {useState, useEffect} from 'react';
export const removeVietnameseTones = str => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str;
};
export const convertWeekToVietnamese = str => {
  if (str === 'Mon') return 'Thứ hai';
  if (str === 'Tue') return 'Thứ ba';
  if (str === 'Wed') return 'Thứ tư';
  if (str === 'Thu') return 'Thứ năm';
  if (str === 'Fri') return 'Thứ sáu';
  if (str === 'Sat') return 'Thứ bảy';
  if (str === 'Sun') return 'Chủ nhật';
};

export const convertMonthToVietnamese = str => {
  if (str === 'Jan') return '1';
  if (str === 'Feb') return '2';
  if (str === 'Mar') return '3';
  if (str === 'Apr') return '4';
  if (str === 'May') return '5';
  if (str === 'Jun') return '6';
  if (str === 'Jul') return '7';
  if (str === 'Aug') return '8';
  if (str === 'Sep') return '9';
  if (str === 'Oct') return '10';
  if (str === 'Nov') return '11';
  if (str === 'Dec') return '12';
};

export function useDebounce(text, delay) {
  delay = delay || 500;
  const [debounced, setDebounced] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(text);
    }, delay);

    return () => {
      setDebounced(text);
      clearTimeout(handler);
    };
  }, [text, delay]);

  return debounced;
}
export function convertOrderStatusToVietnameseWithDetail(status) {
  switch (status) {
    case 'WAITING':
      return {
        status: 'đang chờ xác nhận',
        detail: 'Vui lòng chờ người bán xác nhận',
      };
    case 'CONFIRMED':
      return {
        status: 'đã được xác nhận',
        detail: 'Đơn hàng của bạn sẽ được giao ngay trong hôm nay',
      };
    case 'DELIVERING':
      return {
        status: 'đang được vận chuyển',
        detail: 'Đơn hàng của bạn đang được giao đến địa chỉ của bạn',
      };
    case 'DELIVERED':
      return {
        status: 'đã được vận chuyển thành công',
        detail: 'Đơn hàng của bạn đã được giao đến địa chỉ của bạn',
      };
    case 'CANCEL':
      return {status: 'đã bị hủy', detail: 'Đơn hàng của bạn đã bị hủy'};
    default:
      return {status: 'đã bị hủy', detail: 'Đơn hàng của bạn đã bị hủy'};
  }
}
export function convertOrderStatusToNavigatorIndex(status) {
  switch (status) {
    case 'WAITING':
      return ;
    case 'CONFIRMED':
      return ;
    case 'DELIVERING':
      return ;
    case 'DELIVERED':
      return ;
    case 'CANCEL':
      return ;
    default:
      return ;
  }
}
