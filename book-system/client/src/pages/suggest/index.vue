<template>
  <view class="box">
    <textarea @input="change" @confirm="confirm" placeholder="请输入您的想法..." :maxlength="240" :auto-height="true" :auto-focus="true"></textarea>
    <div @click="confirm" type="primary">发表意见</div>
  </view>
</template>
<script>
import api from "../../service/index";
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    confirm() {
      let model = {
        content: this.value
      };

      var userInfo = wx.getStorageSync("userInfo");
      api
        .post(
          "/api/suggest/add",
          model,
          userInfo.id
        )
        .then(res => {
          wx.navigateBack();
          wx.showToast({
            title: "发表成功！",
            icon: "success"
          })
        });
    },
    change(e) {
      this.value = e.target.value;
    }
  }
};
</script>
<style scoped>
.box {
  padding: 10px 20px;
  height: 100vh;
  box-sizing: border-box;
}
textarea {
  width: 100%;
}
div {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 44px;
  background-color: #ed424b;
  color: #fff;
}
</style>

