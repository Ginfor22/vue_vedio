import ApiRequest from './directives/request.ts'
const apiRequest = new ApiRequest({
  // baseURL: import.meta.env.VITE_BASE_URL,
  // timeout: import.meta.env.VITE_TIMEOUT,
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Token: localStorage.getItem('token') || ''
  },
  interceptors: {
      requestInterceptor: (config) => {
      if (config.headers === undefined) {
        config.headers = {}
      }
      return config
    },
      requestInterceptorCatch: (error) => {
      return error
    },
      responseInterceptor: (res) => {
      return res
    },
      responseInterceptorCatch: (error) => {
      return error
    }
  }
})


export default apiRequest
