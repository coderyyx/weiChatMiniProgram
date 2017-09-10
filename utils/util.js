const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeymd = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('.')
}

const getParams = obj => {
  let params="";
  let i = 0;
  for (let item in obj){
    let items = i == 0 ? '?' + item + '=' + obj[item] : '&'+item + '=' + obj[item];
    params+=items;
    i++;
  }
  return params;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime : formatTime,
  getParams : getParams,
  formatTimeymd : formatTimeymd
}
