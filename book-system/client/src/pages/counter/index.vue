<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
import store from "./store";

export default {
  computed: {
    count() {
      return store.state.count;
    }
  },
  mounted() {
    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx5b8f9b3499b05e42&secret=f82fb2009bcb53654d2080150be02255&js_code=${wx.getStorageSync(
      "code"
    )}&grant_type=authorization_code`;

    var Fly = require("flyio/dist/npm/wx");
    var fly = new Fly();

    // wx.showLoading({
    //   title: "加载中"
    // });

    var userInfo = wx.getStorageSync("user") || {};
    console.log(userInfo);
    url = `http://192.168.1.100:3000/api/users/getUserInfo`;
    fly
      .post(url, {
        encryptedData: userInfo.encryptedData,
        iv: userInfo.iv,
        code: wx.getStorageSync("code")
      })
      .then(result => {
        console.log(result.data);
      });
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    }
  }
};
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
