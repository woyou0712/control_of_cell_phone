<template>
  <div class="home">
    <div id="phone-box"></div>
    <my-loader />
    <div class="to-activate" @click="toActivate">激活</div>
    <div class="to-home" @click="toHome">首页</div>
    <div class="to-retreat" @click="toRetreat">返回</div>
    <div class="to-input" @click="isInput = true">输入</div>
    <div class="to-update" @click="viewPhone">刷新</div>
    <div class="input-box" v-show="isInput">
      <input class="input" type="text" v-model="text" />
      <button class="button" @click="submitInput">确定</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import loader from "@/components/loader.vue";
export default {
  name: "HomeView",
  components: { "my-loader": loader },
  setup() {
    const {
      viewPhone,
      initSwipe,
      isInput,
      text,
      submitInput,
      toActivate,
      toHome,
      toRetreat,
    } = require("./methods/setPhone.js");
    onMounted(() => {
      viewPhone();
      initSwipe();
    });
    return {
      isInput,
      text,
      submitInput,
      toActivate,
      toHome,
      toRetreat,
      viewPhone,
    };
  },
};
</script>
<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  position: relative;
  #phone-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    .shade{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }
  .to-update,
  .to-input,
  .to-activate,
  .to-home,
  .to-retreat {
    position: absolute;
    width: 40px;
    height: 40px;
    box-shadow: 0 0 3px 0 #888;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #fff;
    z-index: 100;
  }
  .to-activate {
    background-color: #f56c6c;
    top: 100px;
    right: 2px;
  }
  .to-home {
    background-color: #67c23a;
    top: 200px;
    right: 2px;
  }
  .to-retreat {
    background-color: #f56c6c;
    top: 300px;
    right: 2px;
  }
  .to-input {
    background-color: #409eff;
    bottom: 100px;
    right: 2px;
  }
  .to-update {
    top: 100px;
    left: 2px;
    background-color: #e6a23c;
  }
  .input-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 4px 0 #888;
    .input {
      width: 80%;
    }
    .button {
      width: 18%;
    }
  }
}
</style>
