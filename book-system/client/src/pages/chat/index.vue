<template>
  <view class="contanier">
    <scroll-view @scrolltolower="bottom" scroll-y scroll-with-animation :scroll-into-view="content" class="box">
      <ChatBox :position="item.userId == userInfo.id ? 'right':'left'" :id="item.content" v-for="(item,index) in list" :key="index" :message="item"></ChatBox>
    </scroll-view>
    <view class="input-box">
      <input v-model="value" :cursor-spacing="10" />
      <span @click="send">确定</span>
    </view>
  </view>
</template>
<script>
import ChatBox from "../../components/chat-box";

let socket = null;

export default {
  components: {
    ChatBox
  },
  data() {
    return {
      userInfo: {},
      list: [],
      value: "",
      content: ""
    };
  },
  mounted() {
    this.userInfo = wx.getStorageSync("userInfo");
    this.socket();
  },
  onUnload() {
    this.list = [];
    socket.emit("close", { bookId: this.$root.$mp.query.bookId });
    console.log("close");
  },
  methods: {
    send() {
      this.list.push({
        avatarUrl: this.userInfo.avatarUrl,
        nickName: this.userInfo.nickName,
        content: this.value,
        bookId: this.$root.$mp.query.bookId,
        userId: this.userInfo.id
      });
      // this.content = this.value;

      socket.emit("message", {
        avatarUrl: this.userInfo.avatarUrl,
        nickName: this.userInfo.nickName,
        content: this.value,
        userId: this.userInfo.id,
        bookId: this.$root.$mp.query.bookId
      });

      this.value = "";
    },
    bottom() {
      this.content = "";
    },
    socket() {
      const io = require("weapp.socket.io/dist/weapp.socket.io.js");

      socket = io("https://www.dbfu.top");

      socket.on("message", data => {
        this.list.push(data);
      });

      socket.on("getHistory", data => {
        this.list = [...this.list, ...data.messages];
      });

      socket.on("count", data => {
        wx.setNavigationBarTitle({
          title: "在线(" + data.count + ")"
        });
      });

      socket.emit("join", { bookId: this.$root.$mp.query.bookId });
    }
  }
};
</script>
<style scoped>
.box {
  overflow: auto;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 20px 0;
  padding-bottom: 70px;
}
.input-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  border-top: 1px solid #f4f4f4;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.input-box input {
  flex: 1;
  border: 1px solid #f4f4f4;
  border-radius: 20px;
  padding: 0 12px;
  height: 40px;
  background-color: #f4f4f4;
  margin-right: 10px;
}
.input-box span {
  width: 80px;
  flex: 0 0 80px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #088cb7;
  border-radius: 8px;
  color: #fff;
}
</style>
