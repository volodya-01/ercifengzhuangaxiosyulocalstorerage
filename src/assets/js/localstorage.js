let obj = {};

/**
 * putLocalStorage 把数据放到本地存储
 * @param {*} key
 * @param {*} value
 */
obj.putLocalStorage = function (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * getLocalStorage 获取本地存储数据
 * @param {*} key
 */
obj.getLocalStorage = function (key) {
  var obj = window.localStorage.getItem(key);
  if (obj && obj != 'undefined' && obj != 'null') {
    return JSON.parse(obj);
  }
  return '';
};

/**
 * removeLocalStorage 清除本地数据
 * @param {*} key
 */

obj.removeLocalStorage = function (key) {
  if (key) {
    window.localStorage.removeItem(key);
  } else {
    console.log(arguments)
    for (var i in arguments) {
      window.localStorage.removeItem(arguments[i]);
    }
  }
};


export default obj;