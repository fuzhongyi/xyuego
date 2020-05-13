import Taro, { Component } from '@tarojs/taro'
import { Text, View, Image } from '@tarojs/components'
import './index.scss'

export default ({ list }) => {
  return (
    <View className='goods-card-list at-row at-row--wrap'>
      {[...Array(20)].map((v, i) => {
        // const { title, pict_url, zk_final_price, volume, coupon_amount = 0 } = v
        return (
          <View className='goods-card at-col at-col-6'>
            <Image
              className='goods-img'
              mode='aspectFill'
              src='https://img.alicdn.com/imgextra/i2/1116098207/O1CN01xHpanA2AUr6eGXDmC_!!1116098207.jpg_310x310.jpg'
            />
            <View className='at-row at-row--wrap goods-info'>
              <View className='at-col at-col-12 goods-name'>【买1送1】408g松露黑巧克力礼盒装</View>
              <View className='at-row at-row--wrap'>
                <View className='at-row goods-pre'>
                  <View className='at-col at-col-6'>天猫价 ¥17.9</View>
                  <View className='at-col at-col-6 tr'>已售1.6万</View>
                </View>
                <View className='at-row'>
                  <View className='at-col at-col-6 goods-money'>
                    <Text className='label'>券后价 ¥</Text>12.9
                  </View>
                  <View className='at-col at-col-6 tr'>
                    <Text className='goods-quan'>
                      <Text className='border'>5元券</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      })}
    </View>
  )
}
