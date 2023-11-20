<script setup lang="ts">
import { ref } from 'vue'
import { ElEmpty } from 'element-plus'
import { VideoList } from '../vedio/index.ts'
import UserFavorites from './user-favorites.vue'
// import CollectList from './collect-list.vue'
import {} from 'vue'
// import CollectionsList from './collections-list.vue'
import {videoStore} from '../vedio/videos.ts'
const activeName = ref('videos')

const handleClick = (tab: any) => {
  console.log(tab)
}
const collectionsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>
<template>
  <div class="user-collect">
    <template v-if="videoStore().isEmpty.collect">
      <el-empty
        image="https:../../.png"
        description="暂无内容"
      />
    </template>

    <template v-else>
      <div class="user-collect-list">
        <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
          <el-tab-pane label="收藏夹" name="favorites">
            <user-favorites>
              <collect-list />
            </user-favorites>
          </el-tab-pane>
          <el-tab-pane label="视频" name="videos">
            <video-list :videoList="videoStore().userCollectVideos"></video-list>
          </el-tab-pane>
          <el-tab-pane label="合集" name="collections">
            <user-favorites>
<!--              <collections-list />-->
              <div class="collections-list">
                <collections-item v-for="i in collectionsList" />
              </div>
            </user-favorites>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user-collect {
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

  .user-collect-list {
    margin-top: 12px;
    width: 100%;

    :deep(.el-tabs__header) {
      align-items: center;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 1);
      display: flex;
      height: 40px;
      justify-content: space-between;
      margin-bottom: 4px;
      position: relative;
      width: 100%;
      border: none;

      .el-tabs__item {
        font-size: 13px;
        line-height: 21px;

        &::before {
          background: rgba(242, 242, 243, 1);
          content: '';
          height: 16px;
          left: -2px;
          position: absolute;
          top: 4px;
          width: 1px;
        }
        &:first-child::before {
          display: none;
        }
      }
    }
  }
}
</style>
