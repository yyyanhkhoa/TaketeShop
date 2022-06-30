import React from 'react';
import {View} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSelector } from 'react-redux';
import {BANNER_DUMMY_DATA} from '../dummy_database/dummy-data';
import Banner from './UI/Banner';

function BannerPager(props) {
  const banners = useSelector(state => state.banner.banners);  

  return (
    <PagerView
      style={{...props.style}}
      initialPage={0}
      showPageIndicator={true}>
      {banners.map((banner, index) => (
        <View key={index}>
          <Banner
            id={banner.id}
            title={banner.title}
            image={banner.image}
            discount={banner.discount}
            endTime={banner.endTime}></Banner>
        </View>
      ))}
    </PagerView>
  );
}

export default BannerPager;
