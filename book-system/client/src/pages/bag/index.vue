<template>
  <view class="box">
    <view v-if="!list.length" class="no-data">暂无收藏</view>
    <book-item v-for="item in list" :key="item.id" :model="item"></book-item>
  </view>
</template>
<script>
import bookItem from "../../components/book-item";
import service from "../../service/index";
export default {
  components: {
    bookItem
  },
  data() {
    return {
      list: [],
      userInfo: {}
    };
  },
  methods: {},
  onShow() {
    wx.setNavigationBarTitle({
      title: "书架"
    });

    // wx.showLoading({
    //   title: "加载中"
    // });

    var userInfo = wx.getStorageSync("userInfo");

    if (!userInfo.id) {
      wx.navigateTo({
        url: "/pages/auth/main"
      });
      return;
    }

    service
      .get("/api/bag/list", { userId: userInfo.id }, userInfo.id)
      .then(res => {
        this.list = res.data;

        wx.hideLoading();
      });
  }
};
</script>
<style scoped>
.box {
  padding: 20px 0;
}
.no-data {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
