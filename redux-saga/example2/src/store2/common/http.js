/**
 *  暴露 http 接口
 */
import axios from 'axios'
import config from './config'

function connectUrlParams(paramObj) {
  let paramsArr = []
  for (let k in paramObj) {
    paramsArr.push(`${k}=${paramObj[k]}`)
  }
  return paramsArr.join('&')
}

export default {
  async get (action, params) {
    try {
      const pramsStr = connectUrlParams(params.data)
      const url = `${config[params.host]}/${action}?${pramsStr}`
      const response = await axios.get(url)
      // console.log('respons', response)
      return response.data
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async post (action, params) {
    try {
      const url = `${config[params.host]}/${action}`
      const response = await axios.post(url, params)
      // console.log('respons', response)
      return response.data
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  promiseGet (action, params) {
    return new Promise(function(resolve, reject) {
      const pramsStr = connectUrlParams(params.data)
      const url = `${config[params.host]}/${action}?${pramsStr}`
      axios.get(url).then(function(res) {
        resolve(res.data)
      })
    })
  }
}