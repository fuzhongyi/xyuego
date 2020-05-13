import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtGrid, AtDivider } from 'taro-ui'
import { GRID_HOME_LIST, BANNER_HOME_LIST } from '@/utils/constant'
import { GoodsCardList } from '@/components'
import './index.scss'

class Index extends Component {
  state = {
    // 是否在当前页面
    isCur: true,
    bannerIndex: 0,
  }

  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#c2e6f6',
  }

  componentWillUnmount() {}

  componentDidShow() {
    this.setBgColor()
    this.setState({ isCur: true })
  }

  componentDidHide() {
    this.setState({ isCur: false })
  }

  goSearch = () => Taro.navigateTo({ url: '/pages/search/index' })

  bannerChange = e => {
    const { isCur } = this.state
    if (!isCur) return
    const bannerIndex = e.target.current
    this.setState({ bannerIndex }, this.setBgColor)
  }

  setBgColor = () => {
    const { color } = BANNER_HOME_LIST[this.state.bannerIndex]
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color,
      animation: { duration: 700 },
    })
  }

  render() {
    const { bannerIndex } = this.state
    const { color } = BANNER_HOME_LIST[bannerIndex]
    return (
      <View className='home'>
        <View style={`background:${color}`}>
          <AtSearchBar
            disabled
            placeholder='输入商品名或粘贴宝贝标题搜索'
            onFocus={this.goSearch}
          />
          <View className='banner-bg'></View>
        </View>
        <View className='container'>
          <Swiper
            className='banner'
            indicatorActiveColor='#fff'
            circular
            indicatorDots
            autoplay
            value={bannerIndex}
            onChange={this.bannerChange}
          >
            {BANNER_HOME_LIST.map(v => (
              <SwiperItem key={v.pic}>
                <Image src={v.pic} mode='widthFix' style='width: 100%' />
              </SwiperItem>
            ))}
          </Swiper>
          <View className='nav'>
            <AtGrid data={GRID_HOME_LIST} hasBorder={false} columnNum={5} />
          </View>
        </View>
        <AtDivider>发现好货</AtDivider>
        <GoodsCardList />
        {/* <Navigator url='/pages/category/index?type=large'>跳转</Navigator> */}
      </View>
    )
  }
}

export default Index
