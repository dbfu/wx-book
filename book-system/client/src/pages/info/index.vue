<template>
  <div class="box">
    <info :model="info"></info>
    <view class="division"></view>
    <view class="desc">
      <view class="desc-title">小说简介</view>
      <view class="desc-content">{{info.desc}}</view>
    </view>
    <view class="division"></view>
    <view @click="toCatalog" class="list">
      <text class="list-text">目录</text>
      <view class="chapterName">
        <text>共 {{info.chapterLength}} 章</text>
        <image src="/static/images/more.png" />
      </view>
    </view>
    <view class="division"></view>
    <view @click="toChat" class="list">
      <text class="list-text">在线讨论</text>
      <view class="chapterName">
        <image src="/static/images/more.png" />
      </view>
    </view>
    <view class="division"></view>
    <view class="comment-box">
      <view class="comment-title">
        <text style="font-size: 18px; font-weight: bold;">热门书评</text>
        <text style="font-size: 14px; color: #969ba3; margin-left: 10px;">{{total}}条评论</text>
      </view>
      <comment @select="toDetail" v-for="(item,index) in comments" :key="index" :comment="item"></comment>
      <view v-if="!total" class="no-data">暂无数据</view>
      <view class="comment-footer">
        <view class="btn-left-box">
          <span @click="comment" :style="{color: '#4284ed'}">写评论</span>
          <span class="line">|</span>
          <span @click="toReview" :style="{color: '#4284ed'}">书评区</span>
        </view>
      </view>
    </view>
    <view class="division"></view>
    <view class="alike-box">
      <view class="alike-title">
        <text style="font-size: 18px; font-weight: bold;">相似书籍</text>
      </view>
      <view class="alike-content">
        <view @click="toInfo(item)" v-for="item in alikes" :key="item.id" class="alike-item">
          <image :src="baseUrl + item.imageUrl" />
          <view style="text-align: left; width: 90%; margin: 0 auto;line-height: 20px;">
            <text>{{item.name}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="btn-left-box">
        <span @click="collect" :style="{color: !info.isCollect?'#333':''}">{{info.isCollect?"已在书架":"加入书架"}}</span>
        <span class="line">|</span>
        <span @click="recommend" :style="{color: !info.isRecommend?'#333':''}">{{info.isRecommend?"已经推荐":"我要推荐"}}</span>
      </view>
      <span @click="read" class="read-btn">{{info.chapterId?"继续阅读":"开始阅读"}}</span>
    </view>
  </div>
</template>
<script>
import info from "./info";
import comment from "../../components/comment";
import service from "../../service/index";
import utils from "../../utils/index";
export default {
  components: {
    info,
    comment
  },
  data() {
    return {
      info: {},
      userInfo: {},
      alikes: [],
      comments: [],
      total: 0,
      baseUrl: "https://www.dbfu.top"
    };
  },
  created() {
    this.userInfo = {};
    this.info = {};
    this.alikes = [];
    wx.showLoading({
      title: "正在加载...",
      mask: true
    });
  },
  computed: {
    isShowMore() {
      return this.total > 3;
    }
  },

  onShow() {
    this.getComments();
  },

  mounted() {
    this.userInfo = {};
    this.info = {};
    this.alikes = [];

    var userInfo = wx.getStorageSync("userInfo");

    // this.getComments();

    service
      .get("/api/book/query/" + this.$root.$mp.query.id, {}, userInfo.id)
      .then(res => {
        // wx.hideLoading();
        this.info = res.data;
        service
          .get(
            "/api/book/alike",
            { keyword: res.data.type, id: res.data.id },
            userInfo.id
          )
          .then(result => {
            this.alikes = result.data;
          });
      });

    this.userInfo = userInfo || {};
  },
  methods: {
    toDetail(comment) {
      wx.setStorageSync("comment", comment);
      wx.navigateTo({
        url: "/pages/review-detail/main?commentId=" + comment.id
      });
    },
    comment() {
      wx.navigateTo({
        url: "/pages/comment/main?bookId=" + this.info.id
      });
    },
    recommend() {
      if (this.info.isRecommend) return;
      var userInfo = wx.getStorageSync("userInfo");
      service
        .post(
          "/api/recommend/add",
          { bookId: this.$root.$mp.query.id },
          userInfo.id
        )
        .then(res => {
          wx.showToast({
            title: "推荐成功！",
            icon: "success"
          });
          this.info.isRecommend = true;
        });
    },
    toCatalog() {
      wx.navigateTo({
        url:
          "/pages/catalog/main?id=" +
          this.$root.$mp.query.id +
          "&chapterId=" +
          this.info.chapterId
      });
    },
    toInfo(book) {
      wx.redirectTo({
        url: "/pages/info/main?id=" + book.id
      });
    },
    collect() {
      var userInfo = wx.getStorageSync("userInfo");
      if (this.info.isCollect) {
        service
          .post("/api/bag/cancel", { bookId: this.info.id }, userInfo.id)
          .then(res => {
            wx.showToast({
              title: "取消收藏",
              icon: "success"
            });
            this.info = { ...this.info, isCollect: false };
          });
      } else {
        service
          .post("/api/bag/add", { bookId: this.info.id }, userInfo.id)
          .then(res => {
            wx.showToast({
              title: "收藏成功",
              icon: "success"
            });
            this.info = { ...this.info, isCollect: true };
          });
      }
    },
    getComments() {
      service
        .get("/api/comment/list", {
          bookId: this.$root.$mp.query.id,
          page: 0,
          size: 3,
          type: "hot"
        })
        .then(res => {
          res.data.body.map(item => {
            item.image = item.avatarUrl;
            item.time = utils.formatTime(item.createTime);
          });
          this.total = res.data.total || 0;
          this.comments = res.data.body;
        });
    },
    read() {
      wx.navigateTo({
        url: "/pages/reader/main?id=" + 0 + "&bookId=" + this.$root.$mp.query.id
      });
    },
    toReview() {
      wx.navigateTo({
        url: "/pages/review/main?bookId=" + this.$root.$mp.query.id
      });
    },
    toChat() {
      wx.navigateTo({
        url: "/pages/chat/main?bookId=" + this.$root.$mp.query.id
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
.box {
  padding: 20px 0;
  padding-top: 0;
  overflow: hidden;
}
.division {
  height: 8px;
  background-color: #f4f4f4;
}
.desc {
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f4f4;
}
.desc-title {
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 600;
}
.desc-content {
  padding: 0px 14px;
  font-size: 14px;
  font-weight: 400;
  text-indent: 2em;
}
.list {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
}
.list-text {
  font-size: 16px;
  font-weight: 600;
}
.chapterName {
  font-size: 14px;
  font-weight: 400;
}

.chapterName image {
  width: 16px;
  height: 16px;
  margin: 12px 0;
  margin-left: 6px;
  vertical-align: top;
}
.comment-box {
  padding: 0px 14px;
}
.comment-box .comment-title {
  line-height: 40px;
  border-bottom: 1px solid #f4f4f4;
}

.comment-footer {
  color: #4284ed;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #f0f1f2;
  text-align: center;
  margin: 0 -20px;
}

.comment-content .comment-bottom:last-of-type {
  border-bottom: none;
}

.alike-box {
  padding: 0 14px;
  padding-bottom: 20px;
}
.alike-title {
  line-height: 40px;
  border-bottom: 1px solid #f4f4f4;
}
.alike-content {
  padding: 14px 0;
  white-space: nowrap;
  overflow: auto;
}
.alike-item {
  width: 25%;
  display: inline-block;
  text-align: center;
  white-space: normal;
  vertical-align: top;
}
.alike-item image {
  width: 90%;
  height: 106px;
}
.alike-item text {
  font-size: 14px;
  text-align: left;
  line-height: 20px;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 54px;
  line-height: 54px;
  display: flex;
  font-size: 16px;
  background-color: #fff;
}

.btn-left-box {
  flex: 1;
  display: flex;
  border-top: 1px solid #f4f4f4;
}
.btn-left-box span {
  color: #969ba3;
  flex: 1;
  text-align: center;
  font-size: 18px;
}
.btn-left-box .line {
  flex: 0 0 10px;
  width: 10px;
  color: #ccc;
  font-weight: 200;
}
.read-btn {
  background-color: #ed424b;
  text-align: center;
  color: #fff;
  flex: 0 0 140px;
}
.isCollect {
  color: #333;
}
</style>
