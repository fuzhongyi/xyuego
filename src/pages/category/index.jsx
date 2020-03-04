import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import request from '@/utils/request'
import largeBanner from '@/assets/img/category_banner_large.png'
import topBanner from '@/assets/img/category_banner_top.png'
import CouponCard from '@/components/CouponCard'
import './index.scss'

const CATEGORY_TYPE = [
  '综合',
  '女装',
  '家居家装',
  '数码家电',
  '鞋包配饰',
  '美妆个护',
  '男装',
  '内衣',
  '母婴',
  '食品',
  '运动户外',
]

const tabList = CATEGORY_TYPE.map(title => ({ title }))

const CATEGORY_LIST = [
  {
    label: '大额优惠',
    value: 'large',
    data: [9660, 9658, 9655, 9656, 9648, 9653, 9654, 9652, 9650, 9649, 9651],
    banner: largeBanner,
  },
  {
    label: '品牌尖货',
    value: 'top',
    data: [3786, 3788, 3792, 3793, 3796, 3794, 3790, 3787, 3789, 3791, 3795],
    banner: topBanner,
  },
]

class Index extends Component {
  config = {
    navigationBarTitleText: '加载中',
  }

  state = {
    current: 0,
    category: CATEGORY_LIST[0],
    data: {},
  }

  componentWillMount() {
    const { type } = this.$router.params
    const category = CATEGORY_LIST.find(v => v.value === type) || CATEGORY_LIST[0]
    this.setState({ category })
    this.getCategoryList(category.data[0])
    Taro.setNavigationBarTitle({ title: category.label })
  }

  handleChangeTab = index => {
    const { data, category } = this.state
    const material_id = category.data[index]
    this.setState({ current: index })
    if (!data[material_id]) {
      this.getCategoryList(material_id)
    }
  }

  getCategoryList = material_id => {
    const { data } = this.state
    if (!data[material_id]) {
      data[material_id] = { page_no: 1, page_size: 20, result_list: [] }
    }
    const { page_no, page_size, result_list } = data[material_id]
    Taro.showLoading()
    request
      .get({
        method: 'taobao.tbk.dg.optimus.material',
        material_id,
        page_no,
        page_size,
        result_list,
      })
      .then(res => {
        Object.assign(data[material_id].result_list, res.result_list.map_data)
        this.setState({ data })
        console.log(data)
      })
      .finally(Taro.hideLoading)
  }

  render() {
    const { category, current, data } = this.state
    return (
      <View className='category'>
        <Image className='banner' lazyLoad src={category.banner} />
        <AtTabs
          fixed
          scroll
          swipeable
          current={current}
          tabList={tabList}
          onClick={this.handleChangeTab}
        >
          {CATEGORY_TYPE.map((v, i) => {
            const curMaterial = data[category.data[i]] || { result_list: [] }
            const { result_list } = curMaterial
            const material_id = String(category.data[i])
            return (
              <AtTabsPane key={material_id} current={current} index={i}>
                <View className='coupon-list'>
                  {result_list.map((item, index) => (
                    <CouponCard key={item.item_id} top={index + 1} data={item} />
                  ))}
                </View>
              </AtTabsPane>
            )
          })}
        </AtTabs>
      </View>
    )
  }
}

export default Index
