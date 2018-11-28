<template>
  <view class="comment-box">
    <view class="comment-header">
      <image :src="comment.image" />
      <view class="right-box">
        <view class="name">{{comment.nickName}}</view>
        <view>{{moment(comment.createTime)}}</view>
      </view>
    </view>
    <p class="content">{{comment.content}}</p>
  </view>
</template>
<script>
import moment from "moment";
export default {
  props: {
    comment: Object
  }
};
</script>
<style scoped>
.comment-box {
  padding: 20px;
}
.comment-header {
  display: flex;
}
image {
  flex: 0 0 50px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.right-box {
  flex: 1;
  padding: 10px;
}
.name {
  font-size: 14px;
  color: #969ba3;
}
</style>
