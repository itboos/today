
import { FETCH_DATA, FETCH_SUCCESS } from './type';

/* root reducer */
function rootReducer(state = {}, action) {
  console.log('action:', action)
  switch(action.type) {
    case FETCH_DATA:
        console.log('here...')
        return {
          msg: '这是发起里面的数据', id: action.payload
        }
    case FETCH_SUCCESS: 
       return {
         msg: '这是请求成功里面的数据', id: action.payload
       }
    default:
     return state
  }
}
export default rootReducer;