<template>
  <view class="tab-box">
    <view v-for="item in tabs" :key="item.key" @click="select(item.key)" class="tab-item" :class="{selected: selected===item.key}">
      {{item.title}}
    </view>
  </view>
</template>
<script>
export default {
  props: {
    tabs: {
      default() {
        return [
          { key: "all", title: "全部书评" },
          { key: "hot", title: "热门书评" }
        ];
      },
      type: Array
    },
    default: String
  },
  data() {
    return {
      selected: this.default
    };
  },
  methods: {
    select(key) {
      this.selected = key;
      this.$emit("select", key);
    }
  }
};
</script>
<style scoped>
.tab-box {
  display: flex;
}
.tab-item {
  flex: 1;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.tab-item.selected {
  color: #ed424b;
  border-bottom: 1px solid #ed424b;
}
</style>
