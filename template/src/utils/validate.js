export function isvalidUsername(str) {
  const validMap = ['wangxin', 'wangtong', 'fangjian', 'dengqiu'];
  return validMap.indexOf(str.trim()) >= 0;
}

/**
 * URL的合法性
 * @param url 待检查的URL
 * @returns {boolean} true=合法，false=不合法
 */
export function validateURL(url) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(url);
}

/**
 * 判断字符串是否是小写字母
 * @param str 待检查的字符串
 * @returns {boolean} true=是小写字母，false=不是
 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * 判断字符串是否是大写字母
 * @param str 待检查的字符串
 * @returns {boolean} true=是大写字母，false=不是
 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * 判断字符串是否是大小写字母
 * @param str 待检查的字符串
 * @returns {boolean} true=是大小字母，false=不是
 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

