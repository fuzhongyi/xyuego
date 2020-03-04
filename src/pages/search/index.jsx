import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTag } from 'taro-ui'
import request from '@/utils/request'

class Index extends Component {
  config = {
    navigationBarTitleText: '搜索',
  }

  state = {
    histroy: [1, 2, 3, 3],
  }

  componentWillMount() {
    request
      .get({
        method: 'taobao.tbk.dg.material.optional',
        q: 13256,
      })
      .then(res => console.log(res))
  }
  onChange = val => {
    console.log(val)
  }

  onActionClick = val => {
    console.log(val)
  }

  render() {
    const { histroy } = this.state
    return (
      <View>
        <AtSearchBar
          actionName='搜一下'
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        {histroy.map((item, index) => (
          <AtTag key={String(index)} size='small' active circle>
            {item}1
          </AtTag>
        ))}
      </View>
    )
  }
}

export default Index
