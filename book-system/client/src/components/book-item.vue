<template>
  <div @click="toInfo" class="list">
    <view class="box">
      <image class="book-image" :src="baseUrl + model.imageUrl" />
      <view class="info-box">
        <text class="name">{{ model.name }}</text>
        <view class="author">
          <image class="author-icon" mode="aspectFit" src="../../static/images/user.png" />
          <text>{{ model.author }}</text>
        </view>
        <view class="chapterName-box">
          <text class="chapterName">{{ model.lastChapterName }}</text>
        </view>
      </view>
    </view>
  </div>
</template>
<script>
import card from "../components/card";
export default {
  props: {
    model: Object
  },
  data() {
    return {
      baseUrl: "https://www.dbfu.top"
    };
  },
  methods: {
    toInfo() {
      wx.navigateTo({
        url: "/pages/info/main?id=" + this.model.id
      });
    }
  }
};
</script>
<style scoped>
.list {
  padding: 16px;
  padding-top: 0;
}
.list::after {
  display: block;
  margin-left: 68px;
  margin-right: 0px;
  margin-top: 16px;
  content: "";
  -webkit-transition: margin-left 0.15s;
  transition: margin-left 0.15s;
  border-bottom: 1px solid #f0f1f2;
}
.list .box {
  display: flex;
}
.list .book-image {
  width: 54px;
  height: 72px;
  flex: 0 0 54px;
}
.info-box {
  flex: 1;
  padding: 0px 14px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.info-box .name {
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  display: flex;
  align-items: center;
}
.info-box .author {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
}
.author .author-icon {
  width: 14px;
  height: 16px;
  margin-right: 6px;
}
.author text {
  font-size: 14px;
  color: rgb(227, 135, 0);
}
.info-box .chapterName-box {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
}
.info-box .chapterName {
  font-size: 14px;
  color: #969ba3;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

