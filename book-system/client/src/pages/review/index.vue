<template>
  <view>
    <tabs @select="key => {this.type = key}" default="all" :tabs="tabs"></tabs>
    <view v-if="!comments.length" class="no-data">暂无数据</view>
    <view class="comment-box">
      <comment @select="toDetail" v-for="(item,index) in comments" :key="index" :comment="item"></comment>
    </view>
    <view @click="toComment" class="comment-footer">发表评论</view>
  </view>
</template>
<script>
import tabs from "../../components/tabs";
import comment from "../../components/comment";
import service from "../../service";
import utils from "../../utils/index";

export default {
  components: {
    tabs,
    comment
  },
  data() {
    return {
      tabs: [
        { key: "all", title: "全部书评" },
        { key: "hot", title: "热门书评" }
      ],
      comments: [],
      page: 0,
      type: "all",
      isBottom: false
    };
  },
  onShow() {
    this.comments = [];
    this.isBottom = false;
    this.page = 0;
    this.getComments();
  },
  onReachBottom() {
    if (this.isBottom) return;
    this.page += 1;
    this.getComments();
  },
  watch: {
    type(value) {
      this.page = 0;
      this.comments = [];
      this.getComments();
    }
  },
  methods: {
    toComment() {
      wx.navigateTo({
        url: "/pages/comment/main?bookId=" + this.$root.$mp.query.bookId
      });
    },
    getComments() {
      service
        .get("/api/comment/list", {
          bookId: this.$root.$mp.query.bookId,
          page: this.page,
          size: 10,
          type: this.type
        })
        .then(res => {
          res.data.body.map(item => {
            item.image = item.avatarUrl;
            item.count = 0;
            item.time = utils.formatTime(item.createTime);
          });
          this.comments = [...this.comments, ...res.data.body];
          this.isBottom = res.data.body.length < 10;
        });
    },
    toDetail(comment) {
      wx.setStorageSync("comment", comment);
      wx.navigateTo({
        url: "/pages/review-detail/main?commentId=" + comment.id
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
.comment-box {
  padding: 20px 10px;
  padding-bottom: 50px;
}
.comment-footer {
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
