const baseUrl = "https://www.dbfu.top";

export default {
  get(url, params, userId) {
    var Fly = require("flyio/dist/npm/wx");
    var fly = new Fly();
    let option = {
      headers: {
        "user-id": userId
      },
      method: "get",
    }
    return fly.request(baseUrl + url, params, option);
  },
  post(url, params, userId) {
    var Fly = require("flyio/dist/npm/wx");
    var fly = new Fly();
    let option = {
      headers: {
        "user-id": userId
      },
      method: "post",
    }
    return fly.request(baseUrl + url, params, option);
  }
}