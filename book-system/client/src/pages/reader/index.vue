<template>
  <view>
    <view :class="[background]" @touchmove="handleTap" @touchend="handlEnd" @click="showSetting" class="text-box">
      <view :style="{fontSize:fontSize}" @touchstart="touch(item.id)" v-for="item in list" :key="item.id" class="box">
        <text class="title">{{item.name}}</text>
        <view class="content">
          <view v-for="(o,i) in item.content" :key="i">
            <span class="txt">{{o}}</span>
          </view>
        </view>
      </view>
    </view>
    <reader-footer :isNight="isNight" @tabClick="tabClick" :visible="show"></reader-footer>
    <catalog :chapterId="clickId" @toReader="getChapterContent" :bookId="$root.$mp.query.bookId" :visible="showCatalog"></catalog>
    <setting :visible="settingShow" @fontChange="fontChange" @selectBg="selectBg"></setting>
    <comments :chapterId="clickId" :bookId="$root.$mp.query.bookId" :index="showIndex" :visible="commentShow" :content="text"></comments>
  </view>
</template>
<script>
import ReaderFooter from "./reader-footer";
import catalog from "./catalog";
import service from "../../service/index";
import setting from "./setting";
import comments from "./comments";
export default {
  components: {
    readerFooter: ReaderFooter,
    catalog,
    setting,
    comments
  },
  data() {
    return {
      list: [],
      sort: "",
      show: false,
      showCatalog: false,
      moving: false,
      chapter: {},
      clickId: "",
      background: "bg1",
      fontSize: "20px",
      settingShow: false,
      lastBg: "bg1",
      isNight: false,
      comments: {},
      commentShow: false,
      index: 0,
      showIndex: 0,
      text: "",
      inputShow: false,
      isLongClick: false
    };
  },
  computed: {
    stopmove() {
      return this.showCatalog || this.commentShow ? "stop-move" : "";
    }
  },
  onUnload() {
    this.showCatalog = false;
    this.show = false;
    this.list = [];
  },
  onShow() {},
  mounted() {
    this.list = [];
    var userInfo = wx.getStorageSync("userInfo");

    service
      .get(
        "/api/chapter/content",
        {
          id: this.$root.$mp.query.id,
          bookId: this.$root.$mp.query.bookId
        },
        userInfo.id
      )
      .then(res => {
        res.data.content = this.getContent(res.data.content);
        this.list.push(res.data);
        this.sort = res.data.sort;

        this.getNext(res.data.id).then(data => {
          this.sort = data.sort;
          this.getCache("");
        });
      });
  },

  methods: {
    selectBg(index) {
      switch (index) {
        case 1:
          this.background = "bg1";
          break;
        case 2:
          this.background = "bg2";
          break;
        case 3:
          this.background = "bg3";
          break;
        case 4:
          this.background = "bg4";
          break;
      }
      this.lastBg = this.background;
      this.isNight = false;
    },
    fontChange(value) {
      var i = value / 10 - 5;
      var size = parseInt(this.fontSize);
      size = 20 + i;
      this.fontSize = size + "px";
    },
    getContent(str) {
      if (str) {
        str = str.toString().split("\n");

        var contents = [];

        str.map(o => {
          o = o.trim();
          if (o) {
            contents.push("　　" + o);
          }
        });

        return contents;
      } else {
        return "";
      }
    },
    getNext(id) {
      return new Promise((resolve, reject) => {
        var userInfo = wx.getStorageSync("userInfo");
        service
          .get(
            "/api/chapter/next",
            {
              sort: this.sort,
              bookId: this.$root.$mp.query.bookId,
              id: id
            },
            userInfo.id
          )
          .then(res => {
            res.data.content = this.getContent(res.data.content);
            this.list = [...this.list, res.data];
            resolve && resolve(res.data);
          });
      });
    },
    getCache(id) {
      var userInfo = wx.getStorageSync("userInfo");
      service
        .get(
          "/api/chapter/next",
          {
            sort: this.sort,
            bookId: this.$root.$mp.query.bookId,
            id: id
          },
          userInfo.id
        )
        .then(res => {
          wx.setStorageSync("cacheChapter", res.data);
        });
    },
    getChapterContent(id) {
      wx.showNavigationBarLoading();
      var userInfo = wx.getStorageSync("userInfo");
      this.list = [];
      service
        .get(
          "/api/chapter/content",
          { id: id, bookId: this.$root.$mp.query.bookId },
          userInfo.id
        )
        .then(res => {
          wx.setStorageSync("nextChapter", res.data.nextChapter);
          res.data.content = this.getContent(res.data.content);
          this.list.push(res.data);
          this.sort = res.data.sort;
          this.show = false;
          this.showCatalog = false;

          wx.hideNavigationBarLoading();
        });
    },
    showSetting() {
      if (this.isLongClick) {
        this.isLongClick = false;
        return;
      }
      if (this.showCatalog) {
        this.showCatalog = false;
        return;
      }
      if (this.commentShow) {
        this.commentShow = false;
        return;
      }
      if (this.inputShow) {
        this.inputShow = false;
        return;
      }
      this.show = !this.show;
      this.settingShow = false;
    },
    handleTap(e) {
      if (this.showCatalog) {
        return;
      }

      if (this.show) {
        this.show = false;
        this.settingShow = false;
        this.inputShow = false;
      }
    },
    tabClick(index) {
      if (index == 0) {
        // this.showCatalog = true;
        wx.navigateTo({
          url: "/pages/catalog/main?id=" + this.$root.$mp.query.bookId
        });
      } else if (index == 2) {
        this.settingShow = !this.settingShow;
      } else if (index == 3) {
        if (this.background == "night") {
          this.background = this.lastBg;
          this.isNight = false;
        } else {
          this.background = "night";
          this.isNight = true;
        }
      } else if (index == 4) {
        wx.navigateTo({
          url: "/pages/review/main?bookId=" + this.$root.$mp.query.bookId
        });
      }
    },
    handlEnd() {
      this.moving = false;
    },
    touch(id) {
      if (this.clickId != id && this.clickId < id) {
        var chapter = wx.getStorageSync("cacheChapter");
        chapter.content = this.getContent(chapter.content);
        this.list.push(chapter);
        this.sort = chapter.sort;
        this.clickId = id;
        this.getCache(id);
        // wx.setStorageSync("chapterId", id);
      }
    },
    comment(index) {
      this.index = index;
      this.inputShow = true;
      this.isLongClick = true;
    },
    showComment(index, text) {
      this.showIndex = index;
      this.text = text;
      this.commentShow = true;
    }
  }
};
</script>

<style scoped>
.text-box {
  padding: 10px 14px;
  min-height: 100vh;
}
.stop-move {
  overflow: hidden;
  height: 100vh;
}
.title {
  font-weight: bold;
}
.content {
  margin-top: 10px;
  margin-bottom: 36px;
}
.content .txt {
  line-height: 36px;
  font-family: sans-serif;
  text-align: justify;
}
.flag {
  display: inline-block;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border: 1px solid #333;
  text-align: center;
  color: #333;
  font-size: 12px;
  vertical-align: text-top;
  margin-left: 6px;
}
.bg1 {
  background: url(../../../static/images/bg.jpg);
}
.bg2 {
  background: url(../../../static/images/bg_ypz.png);
}
.bg3 {
  background: #cad9e8;
}
.bg4 {
  background: #d1edd1;
}
.night {
  color: rgba(255, 255, 255, 0.5);
  background: #1a1a1a;
}
.input {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 46px;
  background-color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 0 4px;
}
</style>
