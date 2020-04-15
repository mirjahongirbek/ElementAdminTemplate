import axios from 'axios'


export default {
  install(Vue, options) {
    let  http=axios.create({baseURL:options.url})
    Vue.prototype.$http= function(){
      return http;
    }
    Vue.prototype.$api = {
      send(requestType, apiRoute, params = {}, data = null) {
        return new Promise((resolve, reject) => {
          http[requestType](apiRoute, params || [], data)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              // this.errorHandler(err)
              reject(err)
            })
        })
      },
      get(apiRoute, params = null) {
        return this.send('get', apiRoute, params)
      },
      post(apiRoute, data = null) {
        return this.send('post', apiRoute, data)
      },
      put(apiRoute, data = null) {
        return this.send('put', apiRoute, data)
      },
      patch(apiRoute, data = null) {
        return this.send('patch', apiRoute, data)
      },
      delete(apiRoute, params = null) {
        return this.send('delete', apiRoute, params)
      },
      setToken(token){
        http.defaults.headers.common["Authorization"]="Bearer "+ token;
        localStorage.setItem("token",token);
      },
      errorHandler(err) {
        console.log(Vue)
        console.log(err)
      }
    }
  }
}
