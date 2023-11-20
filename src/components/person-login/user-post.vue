<script setup lang="ts">
import { ElEmpty } from 'element-plus'
import { videoStore } from '../vedio/videos.ts'
</script>
<template>
  <div class="user-work">
    <template v-if="videoStore().isEmpty.post">
      <el-empty
        image="https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/image/EmptySearch.19da93c9.png"
        description="暂无内容"
      />
    </template>

    <template v-else>
      <div class="user-like-list">
        <video-list :videoList="videoStore().userPostVideos"/>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user-work {
  width: 100%;
  height: 100%;
  margin-top: 12px;
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
}
</style>
