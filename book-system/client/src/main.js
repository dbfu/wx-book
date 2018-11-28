import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', 'pages/index/main', '^pages/bag/main', "pages/info/main", "pages/catalog/main", "pages/reader/main", "pages/comment/main"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: false,
      onReachBottomDistance: 50,
      navigationBarBackgroundColor: "#ed424b"
    },
    tabBar: {
      color: '#666666',
      selectedColor: '#000000',
      borderStyle: 'white',
      backgroundColor: '#f8f9fb',
      list: [{
        "pagePath": "pages/bag/main",
        "text": "书架",
        iconPath: "static/images/bag.png",
        selectedIconPath: "static/images/bag_selected.png"
      }, {
        "pagePath": "pages/books/main",
        "text": "书城",
        iconPath: "static/images/home.png",
        selectedIconPath: "static/images/home_selected.png"
      },
      {
        "pagePath": "pages/search/main",
        "text": "搜索",
        iconPath: "static/images/search.png",
        selectedIconPath: "static/images/search_selected.png"
      },
      {
        "pagePath": "pages/user/main",
        "text": "个人",
        iconPath: "static/images/user.png",
        selectedIconPath: "static/images/user_selected.png"
      }]
    },
  }
}
