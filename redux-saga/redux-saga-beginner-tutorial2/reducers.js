export default function counter(state = 0, action) {
  console.log('action:', action)
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    case 'FETCH_SUCCEEDED':
       console.log('payload:', action.payload)
       return 999
    case 'LOGIN_SUCCESS':
       console.log('LOGIN_SUCCESS:', action.payload)
       // 更新state......, 返回新的state
       return 2
    case 'LOGIN_ERROR':
       console.log('LOGIN_ERROR:', action.payload)
       return 3
    case 'LOGIN_REQUEST':
      // console.log('LOGIN_REQUEST:', action.payload)
      return action.payload
    case 'LOGOUT':
      console.log('LOGOUT:', action.payload)
      return 5
    default:
      return state
  }
}
