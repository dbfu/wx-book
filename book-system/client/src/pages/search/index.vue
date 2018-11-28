<template>
  <div class="container">
    <div class="input-box">
      <image src="/static/images/search-icon.png" />
      <input :value="value" @input="search" class="input" />
    </div>
    <div v-if="!value" class="content">
      <div class="title">
        <span class="line"></span>
        <span class="text">热门搜索</span>
      </div>
      <scroll-view @scrolltolower="getMoreList" scroll-y class="right-box">
        <book-item v-for="item in list" :key="item.id" :model="item"></book-item>
      </scroll-view>
    </div>
    <div v-else class="content">
      <view @click="click(item)" class="result-text" v-for="item in result" :key="item.id">
        <span>{{item.startStr}}</span>
        <span style="color: #ed424b">{{value}}</span>
        <span>{{item.endStr}}</span>
      </view>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import BookItem from "../../components/book-item";
import service from "../../service/index";
export default {
  data() {
    return {
      page: 0,
      list: [],
      isMore: true,
      value: "",
      result: []
    };
  },

  components: {
    card,
    BookItem
  },

  onShow() {
    this.value = "";
    this.list = [];
    wx.setNavigationBarTitle({
      title: "搜索"
    });
    wx.showLoading({
      title: "正在加载...",
      mask: true
    });
    this.getList();
  },

  methods: {
    getMoreList() {
      if (!this.isMore) return;
      this.page += 1;
      this.getList();
    },
    getList() {
      var userInfo = wx.getStorageSync("userInfo");

      service
        .get("/api/book/list", {
          page: this.page,
          size: 10,
          type: "search"
        })
        .then(res => {
          this.list = [...this.list, ...res.data];
          this.isMore = res.data.length == 10;
          wx.hideLoading();
        });
    },
    search(e) {
      this.value = e.target.value;

      var userInfo = wx.getStorageSync("userInfo");
      service
        .get("/api/book/search", {
          keyWord: this.value
        })
        .then(res => {
          res.data.map(item => {
            let strs = item.name.split(this.value);
            item.startStr = strs[0];
            item.endStr = strs[1];
          });
          this.result = res.data;
        });
    },
    click(item) {
      wx.navigateTo({
        url: "/pages/info/main?id=" + item.id
      });
      service.post("/api/book/addSearch", { bookId: item.id });
    }
  }
};
</script>

<style scoped>
.input-box {
  position: relative;
  margin: 10px 20px;
  margin-bottom: 0;
}
.input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left: 28px;
  height: 30px;
}
image {
  display: block;
  height: 24px;
  width: 24px;
  position: absolute;
  top: 4px;
  left: 4px;
}
.title {
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  border-bottom: 1px solid #f4f4f4;
  margin-bottom: 10px;
  display: table;
}
.content {
  padding: 20px 0;
}
.line {
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #ed424b;
  margin-right: 6px;
  margin-top: 2px;
}
.text {
  display: table-cell;
  vertical-align: middle;
}
.result-text {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f4f4f4;
  padding: 0 20px;
}
.right-box {
  position: fixed;
  top: 120px;
  bottom: 10px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
