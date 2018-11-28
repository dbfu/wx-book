import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


// loginout() {
//   wx.removeStorageSync("userInfo");
//   wx.navigateTo({
//     url: "/pages/auth/main"
//   });
// }