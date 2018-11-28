<template>
  <view class="comment-box">
    <view class="comment-header">
      <image :src="comment.image" />
      <view class="right-box">
        <view class="name">{{comment.nickName}}</view>
        <view class="time">{{comment.createTime}}</view>
      </view>
    </view>
    <p class="content">{{comment.content}}</p>
    <view class="division"></view>
    <view class="reply-box">
      <view class="reply-header">
        全部回复（{{total}}）
      </view>
      <view v-if="!replys.length" class="no-data">暂无数据</view>
      <reply v-for="(item,index) in replys" :key="index" :comment="item"></reply>
    </view>
    <view @click="toReply" class="reply-footer">回复</view>
  </view>
</template>
<script>
import moment from "moment";
import reply from "../../components/reply";
import service from "../../service";
import utils from "../../utils/index";
export default {
  components: {
    reply
  },
  data() {
    return {
      comment: {},
      replys: [],
      total: 0
    };
  },
  onShow() {
    var comment = wx.getStorageSync("comment");
    this.comment = {
      ...comment,
      createTime: moment(comment.createTime).format("YYYY-MM-DD")
    };
    this.getReplys();
  },
  methods: {
    toReply() {
      wx.navigateTo({
        url:
          "/pages/comment/main?bookId=" +
          this.$root.$mp.query.bookId +
          "&commentId=" +
          this.$root.$mp.query.commentId
      });
    },
    getReplys() {
      service
        .get("/api/reply/list?commentId=" + this.$root.$mp.query.commentId)
        .then(res => {
          res.data.rows.map(item => {
            item.image = item.avatarUrl;
            item.count = 0;
            item.time = utils.formatTime(item.createTime);
          });
          this.replys = res.data.rows;
          this.total = res.data.total;
        });
    }
  }
};
</script>
<style scoped>
.no-data {
  text-align: center;
  padding: 20px 0;
  color: #969ba3;
}
.division {
  height: 10px;
  background-color: #f4f4f4;
  margin: 0 -20px;
}
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
  padding: 4px 14px;
}
.name {
  font-size: 14px;
  color: #969ba3;
}
.time {
  font-size: 12px;
  color: #969ba3;
}
.content {
  padding: 20px 0px;
}
.reply-header {
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f4f4f4;
  margin: 0 -20px;
  padding: 0 20px;
}
.reply-footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  line-height: 50px;
  color: #ed424b;
  text-align: center;
  border-top: 1px solid #f4f4f4;
  background-color: #ffffff;
}
</style>
