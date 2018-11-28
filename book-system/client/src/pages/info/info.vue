<template>
  <div class="container">
    <image class="bg" :src="baseUrl + model.imageUrl" />
    <div class="box">
      <div class="img-box">
        <image :src="baseUrl + model.imageUrl" />
        <div class="name">{{model.name}}</div>
        <div class="desc">
          <span>{{model.author}}</span>
          <span class="line">|</span>
          <span>{{model.type}}</span>
          <span class="line">|</span>
          <span>{{count}}万字</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tag from "../../components/tag";
export default {
  components: {
    tag
  },
  props: {
    model: Object
  },
  data() {
    return {
      baseUrl: "https://www.dbfu.top"
    };
  },
  computed: {
    count() {
      return (this.model.count / 10000).toFixed(2);
    }
  },
  methods: {
    toInfo() {
      wx.navigateTo({
        url: "/pages/info/main?id=" + this.model.id
      });
    }
  }
};
</script>
<style scoped>
.bg {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  filter: blur(30px);
  background-size: 100% auto;
  left: 0;
}

.box {
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
  z-index: 222;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
}

.container {
  width: 100%;
  position: relative;
  height: 200px;
  overflow: hidden;
  text-align: center;
  top: 0;
}

.box .img-box {
  position: absolute;
  width: 100%;
  height: 120px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.box .img-box image {
  width: 90px;
  height: 120px;
}
.box .img-box .name {
  color: #fff;
  margin-top: 4px;
}
.desc {
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.desc .line {
  margin: 0 4px;
  color: #f4f4f4;
}
</style>

