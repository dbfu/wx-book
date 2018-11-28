<template>
  <div :class="showClass" class="footer-box">
    <view @click="tabClick(0)" class="item">
      <image src="../../static/images/ml.png" />
      <h4>目录</h4>
    </view>
    <!-- <view @click="tabClick(1)" class="item">
      <image src="../../static/images/pross.png" />
      <h4>进度</h4>
    </view> -->
    <view @click="tabClick(2)" class="item">
      <image src="../../static/images/setup.png" />
      <h4>设置</h4>
    </view>
    <view @click="tabClick(3)" class="item">
      <image :src="src" />
      <h4>{{isMoring? '夜间':'日间'}}</h4>
    </view>
    <view @click="tabClick(4)" class="item">
      <image src="../../static/images/pl.png" />
      <h4>评论</h4>
    </view>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    isNight: Boolean
  },
  data() {
    return {
      isMoring: true
    };
  },
  mounted() {},
  watch: {
    isNight(value) {
      this.isMoring = !value;
    }
  },
  computed: {
    showClass() {
      return this.visible ? "footer-box-show" : "";
    },
    src() {
      if (this.isMoring) {
        return "../../static/images/night.png";
      } else {
        return "../../static/images/moring.png";
      }
    }
  },
  methods: {
    tabClick(index) {
      this.$emit("tabClick", index);
    }
  }
};
</script>
<style scoped>
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  transition: all 0.15s;
  display: flex;
}
.footer-box-show {
  height: 48px;
  transition: all 0.15s;
}
.item {
  flex: 1;
  text-align: center;
  color: #fff;
  line-height: 48px;
  font-size: 12px;
  padding-top: 6px;
}
.item image {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
}
.item h4 {
  line-height: 16px;
}
</style>
