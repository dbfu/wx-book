<template>
  <div>
    <div class="container">
      <image class="bg" :src="userInfo.avatarUrl" />
      <div class="box">
        <div class="img-box">
          <image :src="userInfo.avatarUrl" />
          <div class="name">{{userInfo.nickName}}</div>
        </div>
      </div>
    </div>
    <view style="margin-top: 10px;"></view>
    <view @click="showInput" class="title-box">
      <image class="jy-icon" src="/static/images/jy.png" />
      <span>意见反馈</span>
      <image class="right-icon" src="/static/images/right.png" />
    </view>
    <view class="bottom-box">
      <button @click="loginout" type="warn">退出登录</button>
    </view>
    <view v-if="show" class="input-box">
      <input @blur="blur" v-model="value" :cursor-spacing="10" auto-focus placeholder="请输入您的意见..." />
      <span @click="send">确定</span>
    </view>
  </div>
</template>
<script>
import service from "../../service/index";
export default {
  data() {
    return {
      userInfo: {},
      show: false,
      value: "",
      timer: 0
    };
  },

  onShow() {
    if (!this.userInfo.id) {
      this.userInfo = wx.getStorageSync("userInfo");
    }
  },

  mounted() {
    wx.setNavigationBarTitle({
      title: "个人"
    });
  },

  methods: {
    loginout() {
      wx.removeStorageSync("userInfo");
      wx.navigateTo({
        url: "/pages/auth/main"
      });
    },
    toInfo() {
      wx.navigateTo({
        url: "/pages/info/main?id=" + this.model.id
      });
    },
    showInput() {
      wx.navigateTo({
        url: "/pages/suggest/main"
      });

      // this.value = "";
      // this.show = false;
    },
    send() {
      var userInfo = wx.getStorageSync("userInfo");
      service
        .post("/api/suggest/add", { content: this.value }, userInfo.id)
        .then(res => {
          wx.showToast({
            title: "提交成功！",
            icon: "success"
          });
        });
      this.show = false;
    }
  }
};
</script>
<style scoped>
.bg {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  filter: blur(30px);
  background-size: 100% auto;
  left: 0;
}

.box {
  width: 100%;
  height: 160px;
  position: absolute;
  top: 0;
  z-index: 222;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.container {
  width: 100%;
  position: relative;
  height: 160px;
  overflow: hidden;
  text-align: center;
  top: 0;
}

.box .img-box {
  position: absolute;
  width: 100%;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.box .img-box image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
.box .img-box .name {
  color: #fff;
  margin-top: 4px;
}
.desc {
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.desc .line {
  margin: 0 4px;
  color: #f4f4f4;
}
.title-box {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f4f4f4;
  padding: 0 20px;
  border-top: 1px solid #f4f4f4;
  display: flex;
}
.title-box .jy-icon {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-top: 17px;
}

.title-box span {
  flex: 1;
  padding-left: 10px;
}

.title-box .right-icon {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-top: 17px;
}
.bottom-box {
  position: fixed;
  bottom: 40px;
  left: 40px;
  right: 40px;
}
.modal-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.input-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 10px;
  border-top: 1px solid #f4f4f4;
  background-color: #fff;
}
.input-box input {
  flex: 1;
  border: 1px solid #f4f4f4;
  border-radius: 20px;
  padding: 0 12px;
  height: 40px;
  background-color: #f4f4f4;
  margin-right: 10px;
}
.input-box span {
  width: 80px;
  flex: 0 0 80px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #f4f4f4;
  border-radius: 4px;
  color: #888;
}
.btn-box {
  display: flex;
  border-top: 1px solid #f4f4f4;
  padding: 10px 0;
}
.btn {
  flex: 1;
  text-align: center;
}
.btn-box button {
  width: 120px;
}
.textarea-box {
  margin: 10px;
  border: 1px solid #f4f4f4;
  border-radius: 4px;
}
</style>

