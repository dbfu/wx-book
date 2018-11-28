<template>
  <div class="box">
    <view class="sort-box">
      <text :class="{selected: sort===1}" @click="sortHandler(1)" class="asc">正序</text>
      <text :class="{selected: sort===0}" @click="sortHandler(0)" class="desc">倒序</text>
    </view>
    <scroll-view scroll-with-animation :scroll-into-view="'c' + toView" enable-back-to-top scroll-y class="list-box">
      <li :id="'c' + item.id" :class="{current: item.id==toView}" @click="() => toReader(item.id)" v-for="item in list" :key="item.id" class="item">{{item.name}}</li>
    </scroll-view>
    <view class="bottom-box">
      <span @click="getNext" class="after">
        <span :class="{disabled: selectIndex == 0}">上一页</span>
      </span>
      <picker @change="select" :value="selectIndex" :range="array">
        <span class="picker">{{index}}</span>
      </picker>
      <span @click="loadMore" class="next">
        <span :class="{disabled: selectIndex == array.length - 1}">下一页</span>
      </span>
    </view>
  </div>
</template>
<script>
import api from "../../service/";
export default {
  data() {
    return {
      list: [],
      index: 0,
      sort: 1,
      toView: "",
      flag: false,
      array: [],
      selectIndex: 0
    };
  },

  onShow() {
    this.getListFirst();
  },

  onUnload() {
    this.list = [];
    this.index = 0;
    this.sort = 1;
    this.flag = false;
    this.toView = "";
  },

  methods: {
    select(e) {
      this.selectIndex = parseInt(e.target.value);
      this.index = this.array[this.selectIndex];
      this.getList();
    },
    getNext() {
      if (this.index != 1) {
        this.index -= 1;
        this.selectIndex -= 1;
        this.getList(true);
      }
    },
    loadMore() {
      if (this.selectIndex == this.array.length - 1) {
        return;
      }
      this.index += 1;
      this.selectIndex += 1;
      this.getList();
    },
    sortHandler(flag) {
      this.sort = flag;
      this.getListFirst();
    },
    toReader(id) {
      wx.redirectTo({
        url:
          "/pages/reader/main?id=" + id + "&bookId=" + this.$root.$mp.query.id
      });
    },
    getListFirst() {
      this.list = [];
      this.toView = "";
      var userInfo = wx.getStorageSync("userInfo");
      api
        .get(
          "/api/chapter/list?bookId=" +
            this.$root.$mp.query.id +
            "&pageIndex=" +
            (this.index - 1) +
            "&sort=" +
            this.sort,
          {},
          userInfo.id
        )
        .then(res => {
          this.list = res.data.list;
          this.toView = res.data.chapterId;
          this.index = parseInt(res.data.index);
          this.selectIndex = this.index - 1;
          let count = parseInt(Number(res.data.total) / 100);
          if (Number(res.data.total) % 100 > 0) {
            count++;
          }

          this.array = [];
          for (let i = 1; i <= count; i++) {
            this.array.push(i);
          }
        });
    },

    getList(flag) {
      var userInfo = wx.getStorageSync("userInfo");
      this.list = [];
      api
        .get(
          "/api/chapter/query?bookId=" +
            this.$root.$mp.query.id +
            "&pageIndex=" +
            (this.index - 1) +
            "&sort=" +
            this.sort,
          {},
          userInfo.id
        )
        .then(res => {
          this.list = res.data.list;
        });
    }
  }
};
</script>
<style scoped>
.box {
  padding: 0 16px;
}
.item {
  line-height: 54px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 20px;
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
  padding: 10px 0;
  overflow: hidden;
  position: absolute;
  top: 43px;
  bottom: 50px;
}
.item.current {
  color: #ed424b;
}
.bottom-box {
  position: fixed;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-top: 1px solid #f4f4f4;
}
.after {
  flex: 1;
  text-align: center;
}
.after span {
  padding: 5px 20px;
  border-radius: 4px;
  background-color: #1890ff;
  color: #fff;
}
.next {
  flex: 1;
  text-align: center;
}
.next span {
  padding: 4px 20px;
  border-radius: 4px;
  background-color: #ed424b;
  color: #fff;
}
.picker {
  flex: 1;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
}
span .disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.25);
}
</style>

