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
    default:
      return state
  }
}
