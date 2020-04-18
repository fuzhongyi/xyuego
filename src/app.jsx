import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'

import './app.scss'
import '../theme/variables.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
}

class App extends Component {
  config = {
    pages: ['pages/index/index', 'pages/search/index', 'pages/nine/index', 'pages/category/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fc5759',
      navigationBarTitleText: '心乐购',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      color: '#666',
      selectedColor: '#fd575c',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './assets/img/tabs_home.png',
          selectedIconPath: './assets/img/tabs_home_on.png',
        },
        {
          pagePath: 'pages/nine/index',
          text: '9.9包邮',
          iconPath: './assets/img/tabs_99.png',
          selectedIconPath: './assets/img/tabs_99_on.png',
        },
        {
          pagePath: 'pages/category/index',
          text: '分类',
          iconPath: './assets/img/tabs_category.png',
          selectedIconPath: './assets/img/tabs_category_on.png',
        },
      ],
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
