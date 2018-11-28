<template>
  <view @click="select" class="comment-content">
    <view class="comment-item">
      <image class="avatar" :src="comment.image" />
      <view class="comment-item-info">
        <div class="nick-name">{{comment.nickName}}</div>
        <p class="content">{{comment.content}}</p>
        <view class="comment-bottom">
          <span style="color: #969ba3; font-size: 14px;">{{comment.time}}</span>
          <view>
            <text class="reply-count" style="color: #969ba3; font-size: 14px;">
              {{comment.replyCount}} 条回复
            </text>
            <!-- <image class="reply-icon" src="../../static/images/comments.png" /> -->
          </view>
        </view>
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
.comment-content {
  padding: 14px 0;
}
.comment-footer {
  color: #4284ed;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #f0f1f2;
  text-align: center;
}
.comment-item {
  display: flex;
  flex-direction: "row";
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 0 0 40px;
}
.comment-item-info {
  flex: 1;
  overflow: hidden;
  margin: 0 10px;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 20px;
  text-indent: 2em;
}
.comment-bottom {
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

