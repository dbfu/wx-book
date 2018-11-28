import moment from "moment"

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  let start = moment(new Date(date));
  let end = moment(new Date());
  let time = end.diff(start);
  if (time < 1000) {
    return "刚刚";
  } else if (time < 60 * 1000) {
    return Math.floor(time / 1000) + "秒前";
  } else if (time < 60 * 60 * 1000) {
    return Math.floor(time / (60 * 1000)) + "分钟前";
  } else if (time < 24 * 60 * 60 * 1000) {
    return Math.floor(time / (60 * 60 * 1000)) + "小时前";
  } else if (time < 30 * 24  * 60 * 60 * 1000) {
    return Math.floor(time / (24  * 60 * 60 * 1000)) + "天前";
  } else {
    return moment(date).format("YYYY-MM-DD");
  }
}

export default {
  formatNumber,
  formatTime
}
