import Taro, { Component } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import couponBg from '@/assets/img/coupon_bg.png'
import topTag from '@/assets/img/top_tag.png'
import './index.scss'

export default ({
  top,
  data: { title, pict_url, zk_final_price, volume, coupon_amount = 0 } = {},
}) => (
  <View className='coupon-card' style={`background-image:url(${couponBg})`}>
    <View class='top-tag top-tag-vertical' style={`background-image:url(${topTag})`}>
      <View class='tag-prefix'>TOP</View>
      <View class='tag-index'>{top}</View>
    </View>
    <View className='prod-img' style={`background-image: url(${pict_url});`}></View>
    <View className='prod-info'>
      <View className='prod-title-wrap'>
        <Text className='prod-title'>{title}</Text>
      </View>
      <View className='prod-price-wrap'>
        <Text className='prod-price-prefix'>现价</Text>
        <Text className='price-unit'>¥</Text>
        <Text className='price-nowprice'>{zk_final_price}</Text>
        <Text class='prod-salecount'>{volume}</Text>
      </View>
      <View className='prod-afterprice-wrap'>
        <Text className='prod-afterprice'>券后价¥{zk_final_price - coupon_amount}</Text>
      </View>
    </View>
    <View className='prod-quancontainer'>
      <View className='prod-quanamount'>{coupon_amount}元</View>
      <View className='prod-quansuffix'>优惠券</View>
      <View className='prod-quandrawbtn'>领券买</View>
    </View>
  </View>
)
