<template>
  <view @click="select" class="reply-content">
    <view class="reply-item">
      <image class="avatar" :src="comment.image" />
      <view class="reply-item-info">
        <view class="reply-header">
          <text class="nick-name">{{comment.nickName}}</text>
          <text class="nick-name">{{comment.time}}</text>
        </view>
        <p class="content">{{comment.content}}</p>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    comment: Object
  },
  methods: {
    select() {
      this.$emit("select", this.comment);
    }
  }
};
</script>
<style scoped>
.reply-content {
  padding: 14px 0;
}

.reply-item {
  display: flex;
  flex-direction: "row";
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 0 0 40px;
}
.reply-item-info {
  flex: 1;
  overflow: hidden;
  margin: 0 10px;
}
.reply-header {
  display: flex;
  justify-content: space-between;
  color: #969ba3;
  font-size: 14px;
}
.nick-name {
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #969ba3;
  line-height: 28px;
  height: 28px;
}
.content {
  font-size: 14px;
  line-height: 20px;
}
.reply-bottom {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
  justify-content: space-between;
}
.reply-icon {
  width: 16px;
  height: 16px;
  vertical-align: text-top;
  margin-top: 1px;
}
.reply-count {
  vertical-align: text-top;
  margin-right: 5px;
}
</style>

