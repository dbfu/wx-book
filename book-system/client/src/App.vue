<script>
export default {
  created() {
    // const io = require("weapp.socket.io/dist/weapp.socket.io.js");

    // const socket = io("http://localhost:3001");

    // socket.on("news", data => {
    //   console.log(data);
    //   socket.emit("client", "hahahah");
    // });

    // 调用API从本地缓存中获取数据
    const first = wx.getStorageSync("first");

    if (!first) {
      wx.setStorageSync("first", true);

      wx.showModal({
        title: "声明",
        content:
          "本站书籍全部来源于网络公共资源，如果不小心侵犯您的利益，请联系邮箱：876809592@qq.com或1074503970@qq.com，本人会把书籍从库中移除。"
      });
    }
  },

  mounted() {}
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
