import Taro from '@tarojs/taro'

const request = options => {
  const { url = '', method = 'GET', data = {} } = options
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `https://api.xyueme.cn/tbk/${url}`,
      data,
      headers: { 'Content-Type': 'application/json' },
      method: method.toUpperCase(),
    })
      .then(res => {
        const { statusCode, data: resData } = res
        if (statusCode !== 200 || resData.sub_msg) {
          Taro.showToast({ title: resData.sub_msg, icon: 'none', mask: true })
          reject(resData)
        } else {
          resolve(resData)
        }
      })
      .catch(err => {
        Taro.showToast({ title: err.errMsg, icon: 'none', mask: true })
        resolve(err)
      })
  })
}

export default {
  get: (...objects) => {
    if (objects.length <= 1) return request({ data: objects[0] })
    const [url, data] = objects
    return request({ url, data })
  },
  post: (...objects) => {
    if (objects.length <= 1) return request({ data: objects })
    const [url, data] = objects
    return request({ url, data, method: 'POST' })
  },
}
