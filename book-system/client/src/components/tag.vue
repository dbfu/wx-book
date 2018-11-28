<template>
  <text class="tag">{{text}}</text>
</template>
<script>
export default {
  props: {
    text: String
  }
};
</script>
<style scoped>
.tag {
  padding: 2px 4px;
  border-radius: 4px;
  border: 1rpx solid #da4f49;
  color: #da4f49;
  font-size: 12px;
  font-weight: 300;
}
</style>
