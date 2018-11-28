<template>
  <view :class="show" class="container">
    <view class="title-box">目录</view>
    <view class="sort-box">
      <text :class="{selected: sort===1}" @click="sortHandler(1)" class="asc">正序</text>
      <text :class="{selected: sort===0}" @click="sortHandler(0)" class="desc">倒序</text>
    </view>
    <scroll-view scroll-with-animation @scrolltolower="getMoreList" :scroll-into-view="'c' + toView" enable-back-to-top scroll-y class="list-box">
      <view @click="() => toReader(item.id)" :class="{current: item.id==toView}" :id="'c' + item.id" v-for="(item,index) in list" :key="index" class="item">{{(index+1)+"、 "+item.name }}</view>
    </scroll-view>
  </view>
</template>
<script>
import api from "../../service/";
export default {
  props: {
    visible: Boolean,
    bookId: String,
    chapterId: String
  },
  data() {
    return {
      sort: 1,
      list: [],
      index: 0,
      toView: "",
      id: ""
    };
  },
  computed: {
    show() {
      return this.visible ? "show" : "";
    }
  },
  watch: {
    visible(value) {
      if (value && this.id != this.bookId) {
        this.getList();
        this.id = this.bookId;
      }
    }
    // bookId(value) {
    //   console.log(124444)
    //   this.id = value;
    // }
  },
  onShow() {
    this.toView = "";
  },
  methods: {
    move() {},
    sortHandler(flag) {
      this.sort = flag;
      // this.index = 0;
      this.list.reverse();
      // this.getList();
    },
    toReader(id) {
      this.toView = id;
      this.$emit("toReader", id);
    },
    getMoreList() {
      this.index++;
      this.getList();
    },

    getList(sort) {
      var userInfo = wx.getStorageSync("userInfo");
      
      api
        .get(
          "/api/chapter/list?bookId=" +
            this.bookId +
            "&pageIndex=" +
            this.index +
            "&sort=" +
            this.sort,
          {},
          userInfo.id
        )
        .then(res => {
          this.list = res.data.list;
          this.toView = res.data.chapterId;
        });
    }
  }
};
</script>
<style scoped>
.container {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 90%;
  background-color: #fff;
  transition: all 0.15s;
  z-index: 100;
  transform: translate3d(100%, 0, 0);
}
.show {
  transform: translate3d(0, 0, 0);
}
.title-box {
  color: #ed424b;
  border-bottom: 1px solid #ed424b;
  line-height: 45px;
  text-align: center;
}
.item {
  line-height: 54px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 16px;
  font-weight: bold;
}
.item.current {
  color: #ed424b;
}
.sort-box {
  padding: 10px;
  text-align: center;
}
.sort-box .selected {
  background-color: #ed424b;
  color: #fff;
}
.asc {
  background-color: #fff;
  color: #ed424b;
  padding: 4px 20px;
  border: 1px solid #ed424b;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 14px;
}
.desc {
  background-color: #fff;
  padding: 4px 20px;
  border: 1px solid #ed424b;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #ed424b;
  font-size: 14px;
}
.list-box {
  padding: 0 24px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  bottom: 0;
}
</style>

