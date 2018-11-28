<template>
  <view class="box">
    <view class="category">
      <view v-for="item in categorys" :key="item.key" @click="select(item.key)" :class="{selected: selected===item.key}" class="item">{{item.text}}</view>
    </view>
    <scroll-view @scrolltolower="getMoreList" scroll-y class="right-box">
      <book-item v-for="item in list" :key="item.id" :model="item"></book-item>
    </scroll-view>
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
      userInfo: {},
      selected: "click",
      page: 0,
      isMore: true,
      categorys: [
        {
          key: "click",
          text: "点击榜"
        },
        {
          key: "collect",
          text: "收藏榜"
        },
        {
          key: "recommend",
          text: "推荐榜"
        },
        {
          key: "search",
          text: "热搜榜"
        },
        {
          key: "number",
          text: "字数榜"
        }
      ]
    };
  },
  methods: {
    reload() {
      this.list = [];
      this.page = 0;
      this.getList();
    },
    select(key) {
      this.selected = key;
      this.list = [];
      this.page = 0;
      this.getList();
    },
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
          type: this.selected
        })
        .then(res => {
          this.list = [...this.list, ...res.data];
          this.isMore = res.data.length == 10;
        });
    }
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "书城"
    });
    this.page = 0;
    this.list = [];
    this.getList();
  }
};
</script>
<style scoped>
.box {
  display: flex;
}
.category {
  flex: 0 0 90px;
  width: 90px;
  border-right: 1px solid #ccc;
  height: 100vh;
}
.item {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.item.selected {
  color: #ed424b;
  border-left: 2px solid #ed424b;
}
.right-box {
  flex: 1;
  padding: 20px 0;
  height: 100vh;
  box-sizing: border-box;
  overflow: auto;
}
</style>
