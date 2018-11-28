<template>
  <view :class="[visibleClass]" class="setting-box">
    <view class="font-box">
      <text>A-</text>
      <slider @change="fontChange" class="slider" step="10" value="50" activeColor="#ed424b" block-size="14" block-color="#ed424b" />
      <text>A+</text>
    </view>
    <view class="bg-box">
      <view @click="selectBg(1)" class="bg-item">
        <view :class="{selected: index === 1}" class="bg1"></view>
      </view>
      <view @click="selectBg(2)" class="bg-item">
        <view :class="{selected: index === 2}" class="bg2"></view>
      </view>
      <view @click="selectBg(3)" class="bg-item">
        <view :class="{selected: index === 3}" class="bg3"></view>
      </view>
      <view @click="selectBg(4)" class="bg-item">
        <view :class="{selected: index === 4}" class="bg4"></view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      index: 1
    };
  },
  computed: {
    visibleClass() {
      return this.visible ? "visible" : "";
    }
  },
  methods: {
    selectBg(index) {
      this.index = index;
      this.$emit("selectBg", index);
    },
    fontChange(e) {
      this.$emit("fontChange", e.target.value);
    }
  }
};
</script>
<style scoped>
.setting-box {
  position: fixed;
  bottom: 48px;
  height: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  transition: all 0.15s;
  display: none;
}
.font-box {
  display: flex;
  line-height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.setting-box text {
  flex: 0 0 60px;
  color: #fff;
  text-align: center;
}
.setting-box slider {
  flex: 1;
  margin: 0;
  margin-top: 24px;
}
.bg-box {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}
.bg-item {
  padding: 0 8px;
  flex: 1;
}
.bg-item view {
  border-radius: 4px;
  height: 34px;
  box-sizing: border-box;
}
.bg-item view.selected {
  border: 1px solid #ed4235;
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
.bg1 {
  background: url(../../../static/images/bg.jpg);
}
.visible {
  height: 154px;
  display: block;
}
</style>

