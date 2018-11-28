<template>
  <div class="list">
    <view class="box">
      <image class="book-image" :src="model.imageUrl" />
      <view class="info-box">
        <text class="name">{{ model.name }}</text>
        <view class="author">
          <image class="author-icon" mode="aspectFit" src="../../static/images/user.png" />
          <text>{{ model.author }}</text>
        </view>
        <view class="status">
          <div class="tag-box">
            <tag :text="model.type"></tag>
          </div>
          <text class="count">{{count}}万字</text>
          <span class="line">|</span>
          <text class="status">完本</text>
        </view>
      </view>
    </view>
  </div>
</template>
<script>
import tag from "../../components/tag";
export default {
  components: {
    tag
  },
  props: {
    model: Object
  },
  data() {
    return {};
  },
  computed: {
    count() {
      return (this.model.count / 10000).toFixed(2);
    }
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
.list .box {
  display: flex;
}
.list .book-image {
  width: 80px;
  height: 100px;
  flex: 0 0 80px;
}
.info-box {
  flex: 1;
  padding: 0px 14px;
  display: flex;
  flex-direction: column;
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
.info-box .status {
  font-size: 12px;
  flex: 1;
  display: flex;
  align-items: center;
  color: #969ba3;
}
.info-box .status .tag-box {
  flex: 1;
}
.info-box .status .count {
  flex: 1;
  text-align: right;
}
.info-box .status .status {
  flex: 1;
  text-align: left;
}
.line {
  flex: 0 0 28px;
  text-align: center;
}
</style>

