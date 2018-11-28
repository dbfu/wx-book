<template>
  <view class="list">
    <view class="box">
      <image :src="model.imageUrl" />
      <view class="info-box">
        <text class="name">{{ model.name }}</text>
        <text class="author">{{ model.author }}</text>
        <text class="chapterName">{{ data }}</text>
      </view>
    </view>
  </view>
</template>
<script>
import card  from '../components/card'
export default {
  data() {
    return {
      data: "6666",
      model: {name: "天下第九",author: "鹅是老五",lastChapterName: "后记"}
    }
  }
};
</script>
<style scoped>
.list {
  padding: 10px;
  padding-top: 0; 
}
.list::after {
  display: block;
  margin-left: 72px;
  margin-right: 10px;
  margin-top: 10px; 
  content: "";
  -webkit-transition: margin-left 0.15s;
  transition: margin-left 0.15s;
  border-bottom: 1px solid #f0f1f2;
}
.list .box {
  display: flex;
}
.list image {
  width: 62px;
  height: 78px;
  flex: 0 0 62px;
}
.info-box {
  flex: 1;
  padding: 0px 10px;
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
  font-size: 14px;
  flex: 1;
  display: flex;
  align-items: center;
  color: #969ba3;
}
.info-box .chapterName {
  font-size: 14px;
  flex: 1;
  display: flex;
  align-items: center;
  color: #969ba3;
}

</style>

