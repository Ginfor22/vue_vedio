<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import AsideBar from './left_asider.vue'
import HeaderNav from './navi.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const my = ref(false)
watchEffect(() => {
  //监听变化
  if (router.currentRoute.value.path === '../user/self') {
    my.value = true
  } else {
    my.value = false
  }
})
</script>

<template>
  <div class="main" :class="{ user: my }">
    <el-aside>
      <aside-bar />
    </el-aside>
    <div class="right-container min">
      <el-affix class="affix">
        <el-header><header-nav /></el-header>
      </el-affix>

      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/global.module";
@import "../assets/styles/variables";
@import "../assets/styles/main";
.main {
  background-color: #fff;
  //background-position: top;
  background-position: left;
  background-size: cover;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  //margin: 0;

  &.user {
    height: auto;
  }
}
.el-aside {
  width: $sidebar-width;
  z-index: 2;
}
.right-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  &.min {
    min-height: 450px;
  }
}
.el-header {
  height: 60px;
  position: sticky;
  z-index: 1;
  padding: 0;
  background-color: #2f3035;
}
</style>
