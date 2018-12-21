import axios from 'axios';
/* import localstorage from '../assets/js/localstorage' */
import store from '../store/store';
import router from '../router/index'
import localstorage from '../assets/js/localstorage'
import {
  Message, Loading
} from 'element-ui';

/* axios.defaults.timeout = 5000; */
axios.defaults.baseURL = 'https://112.64.170.158:8187/Service1.svc';
axios.defaults.headers.post['Content-Type'] = 'pplication/json;charset=UTF-8';

//http request 拦截器
axios.interceptors.request.use(
  config => {
              //第一部分localStorage部分
              // Tip: 1
              // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
  console.log(localstorage.getLocalStorage('userinfo'))
              // Tip: 2
              // 带上 token , 可以结合 vuex 或者重 localStorage
              /* .vue文件中的使用方法：

              存储： this.$localstorage.putLocalStorage('subMenu', this.subMenu)

              获取： this.$localstorage.getLocalStorage('subMenu')

              清除： this.$localstorage.removeItem('subMenu') */

              // if (store.getters.token) {
              //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
              // } else {
              //     // 重定向到登录页面
              // }

              // Tip: 3
              // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
             /*  if (config.method.toLocaleLowerCase() === "post" || config.method.toLocaleLowerCase() === "put" || config.method.toLocaleLowerCase() === "delete") {
                config.data = qs.stringify(config.data);
              } */
              //第二部分cookie方式
              // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
              config.data = JSON.stringify(config.data);
              config.headers = { "Content-Type": "application/json;charset=UTF-8" };
              // if(token){
              //   config.params = {'token':token}
              // }
              return config;
            },
  error => {
    // 请求错误时做些事(接口错误、超时等)
    // Tip: 4
    // 关闭loadding
    console.log('request:', error)

    //  1.判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
      // return service.request(originalRequest);//例如再重复请求一次
    }
    //  2.需要重定向到错误页面
    const errorInfo = error.response
    console.log(errorInfo)
    if (errorInfo) {
      // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      const errorStatus = errorInfo.status; // 404 403 500 ... 等
      router.push({
        path: `/error/${errorStatus}`
      })
    }
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
                /* 第一种 */
                //从哪个页面跳转
                /*   if (response.data.errCode == 2) {
                  router.push({
                    path: "/login",
                    querry: {
                      redirect: router.currentRoute.fullPath
                    }
                  });
                }
                return response; */
                /* 第二种 */
    let data;
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data == undefined) {
      data = response.request.responseText
    } else {
      /* data = response.data */
      data = response;
       Message(`data: ${data}`);
       store.state.count=12364
       /*   router.push({
           path: `/err404`
         }) */
      console.log(store.state.count);
    }
    // 根据返回的code值来做不同的处理（和后端约定）
    switch (data.code) {
      case '':
        break;
      default:
    }
    // 若不是正确的返回code，且已经登录，就抛出错误
    // const err = new Error(data.description)

    // err.data = data
    // err.response = response

    // throw err
    return data
              },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `404请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    console.error(err)
    // 此处我使用的是 element UI 的提示组件
    Message.error(`ERROR: ${err}`);
    return Promise.reject(err) // 返回接口返回的错误信息
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}