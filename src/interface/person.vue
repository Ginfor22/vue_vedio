<script setup lang="ts">
import {  ref } from 'vue'
import UserTab from "../components/person-login/user-tab.vue";
import LoginCode from "../components/person-login/login-code.vue";
import UserItem from "../components/person-login/user-item.vue";
const isDisplay = ref(false)
const isLogin = ref(false)
</script>

<template>
    <div class="my" ref="el">
      <div class="user-detail" :class="{ scrolled: isDisplay }">
        <div class="user-detail-content max">
          <div class="user-header-background"></div>
          <user-item />
          <user-tab />
          <login-code v-if="!isLogin" />
        </div>
      </div>
      <user-footer />
    </div>
</template>

<style lang="scss" scoped>
.scrolled::before {
  opacity: 0; // 滚动后使背景图片消失
}
.my {
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
   overflow-x: hidden;
  user-select: none;
  min-height: 100%;
  .user-detail {
    padding-top: 60px;
    display: flex;
    flex: 1 1;
    min-height: 100%;
    width: 100%;
    .user-header-background {
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 1920px 172px;
      height: 172px;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
    .user-detail-content {
      margin: 0 auto;
      max-width: none;
      width: calc(100% - 120px);
      max-width: 1208px;
      min-height: calc(100vh - 60px);
      min-width: 682px;
    }
  }
}
@media (max-width: 1475px) {
  .user-detail {
    .user-detail-content.max {
      max-width: none;
      width: calc(100% - 120px);
    }
  }
}
@media (max-width: 1328px) {
  .user-detail {
    .user-detail-content {
      max-width: none;
      width: calc(100% - 120px);
    }
  }
}

@media (min-width: 1920px) {
  .user-detail {
    .user-detail-content {
      &::before {
        background-size: 100% 100%;
      }
    }
  }
}
</style>
