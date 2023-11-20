<script setup lang="ts">
import { ElEmpty } from 'element-plus'
import VideoList from '../vedio/video-list.vue'
import {videoStore} from '../vedio/videos'
</script>
<template>
  <div class="user-like">
    <template v-if="videoStore().isEmpty.like">
      <el-empty
        image="https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/image/EmptySearch.19da93c9.png"
        description="暂无内容"
      />
    </template>

    <template v-else>
      <div class="user-like-list">
        <VideoList :videoList="videoStore().userLikeVideos"/>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user-like {
  margin-top: 12px;
  position: relative;

  :deep(.el-empty__image) {
    background-size: 100% 100%;
    height: 158px;
    width: 236px;
  }
  :deep(.el-empty__description) {
    p {
      color: #161823;
      font-size: 18px;
      font-weight: 500;
      line-height: 26px;
    }
  }

  .user-like-list {
    margin-top: 12px;
    width: 100%;
  }
}
</style>
