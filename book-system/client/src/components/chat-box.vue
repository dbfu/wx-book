<template>
  <view :id="id" v-if="position == 'left'" class="chat-box left">
    <view class="user-box">
      <image :src="message.avatarUrl" />
    </view>
    <view class="chat-message-box">
      <view>{{message.nickName}}</view>
      <view class="message-box">
        <span class="message">{{message.content}}</span>
      </view>
    </view>
  </view>
  <view :id="id" v-else class="chat-box right">
    <view class="chat-message-box">
      <view class="message-box">
        <span class="message">{{message.content}}</span>
      </view>
    </view>
    <view class="user-box">
      <image :src="message.avatarUrl" />
    </view>
  </view>
</template>
<script>
export default {
  props: {
    message() {
      return {
        default: {},
        type: Object
      };
    },
    position() {
      return {
        dafaulut: "left",
        type: String
      };
    },
    id: String
  }
};
</script>
<style scoped>
.chat-box {
  display: flex;
  margin-top: 20px;
}

.right {
  justify-content: flex-end;
}

.user-box {
  flex: 0 0 80px;
  width: 100px;
  text-align: center;
}

.user-box image {
  width: 50px;
  height: 50px;
}

.right .name {
  text-align: right;
}

.message-box {
  margin-top: 4px;
}

.message {
  padding: 8px 8px;
  background-color: #fff;
  border-radius: 8px;
  color: #000;
  position: relative;
  display: inline-block;
  max-width: 200px;
  white-space: normal;
  word-break: break-all;
}

.right .message {
  background-color: #088cb7;
  color: #ffffff;
}

.left .message::before {
  content: "";

  position: absolute;

  width: 0;

  height: 0;

  left: -14px;

  top: 12px;

  border: 8px solid;

  border-color: transparent #fff transparent transparent;
}

.right .message::before {
  content: "";

  position: absolute;

  width: 0;

  height: 0;

  right: -14px;

  top: 12px;

  border: 8px solid;

  border-color: transparent transparent transparent #088cb7;
}
</style>

