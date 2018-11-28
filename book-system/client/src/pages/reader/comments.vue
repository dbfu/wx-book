<template>
  <view  :class="{show:visible}" class="comments-box">
    <view class="title-box">
      <div class="count">共{{list.length}}条评论</div>
      <div class="chapter-content">
        <span>{{content}}</span>
      </div>
    </view>
    <scroll-view @scroll="scroll" :scroll-y="true" class="comment-list">
      <view v-for="item in list" :key="item.id" class="comment-item">
        <image class="user-image" :src="item.avatarUrl" />
        <view class="right-box">
          <div class="user-name">{{item.nickName}}</div>
          <div class="comment-content">{{item.content}}</div>
          <div class="time">{{item.createTime}}</div>
        </view>
        <view class="assist-box">

        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import api from "../../service/";
import moment from "moment";
export default {
  props: {
    visible: Boolean,
    bookId: String,
    chapterId: String,
    index: Number,
    content: String
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    scroll(e) {
      e.stopPropagation();
      e.preventDefault();
      console.log(e);
    }
  },
  watch: {
    visible(value) {
      if (value) {
        api
          .get("/api/comment/getCommentsByIndex", {
            bookId: this.bookId,
            chapterId: this.chapterId,
            index: this.index
          })
          .then(res => {
            res.data.map(item => {
              item.createTime = moment(item.createTime).format("M月D日");
            });

            this.list = res.data;
          });
      }
    }
  }
};
</script>
<style scoped>
.comments-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80vh;
  background-color: #fff;
  transition: all 0.3s;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transform: translate3d(0, 100%, 0);
  display: flex;
  flex-direction: column;
}
.show {
  transform: translate3d(0, 0, 0);
}
.title-box {
  padding: 10px 20px;
  text-align: center;
  height: 100px;
  flex: 0 0 100px;
}
.count {
  color: #333;
  font-size: 14px;
  line-height: 30px;
}
.chapter-content {
  color: #333;
  font-size: 14px;
  background-color: #fafafa;
  padding: 10px 16px;
  text-align: left;
  border-radius: 4px;
}
.chapter-content span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.comment-list {
  flex: 1;
  padding: 0 20px;
  overflow: auto;
}
.comment-item {
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid #fafafa;
}
.user-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex: 0 0 30px;
}
.right-box {
  flex: 1;
  padding: 0 14px;
}
.assist-box {
  width: 80px;
  flex: 0 0 80px;
}
.user-name {
  font-size: 14px;
}
.comment-content {
  font-size: 16px;
  line-height: 24px;
  margin: 6px 0;
  text-align: justify;
}
.time {
  font-size: 14px;
  color: #666;
}
</style>
