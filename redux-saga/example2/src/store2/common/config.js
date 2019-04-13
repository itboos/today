// const env = process.env.NODE_ENV;
const env = 'development';
const configMap = {
  development: {
    Base: '//api.github.com',
  },
  production: {
    Base: '',
  }
}
export default configMap[env];