
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILED } from './type';

/* root reducer */
function rootReducer(state = {}, action) {
  // console.log('action:', action)
  switch(action.type) {
    case FETCH_DATA:
        return {
          msg: '这是发起里面的数据', id: action.payload
        }
    case FETCH_DATA_SUCCESS: 
       return {
         msg: '这是请求成功里面的数据', id: action.payload
       }
    case FETCH_DATA_FAILED:
      console.log('出错了:', action.payload)
      return state;
    default:
     return state
  }
}
export default rootReducer;