<template>
  <div class="container">
    <button type="primary" :disabled="!logined" open-type="getUserInfo" @getuserinfo="onGotUserInfo">授权登录</button>
  </div>
</template>

<script>
import card from "@/components/card";
import service from "../../service/index";

export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      logined: false,
      code: ""
    };
  },

  components: {
    card
  },

  methods: {
    onGotUserInfo(e) {
      var url = `/api/users/getUserInfo`;
      service
        .post(url, {
          encryptedData: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv,
          code: this.code
        })
        .then(result => {
          wx.setStorageSync("userInfo", result.data);
          wx.showTabBar();
          wx.switchTab({
            url: "/pages/bag/main"
          });
        });
      //
      // wx.setStorageSync("user", e.mp.detail);
      // console.log(e.mp.detail);
    }
  },

  mounted() {
    var userInfo = wx.getStorageSync("userInfo");

    if (userInfo.id) {
      wx.switchTab({
        url: "/pages/bag/main"
      });
      return;
    }

    wx.hideTabBar();
    wx.login({
      success: res => {
        // wx.setStorageSync("code", res.code);
        this.logined = true;
        this.code = res.code;

        console.log(res);
      }
    });
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
}


</style>
