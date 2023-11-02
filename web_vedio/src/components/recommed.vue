<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect
} from 'vue'
import SwiperControl from '../Layout/swiper.vue'
import SwiperVideo from '../Layout/swiper.vue'
import type { IFeedParams, IVideoList } from '../service/video_tab.ts'
import { getVideoList } from '../service/videos.ts'
import { videosCtrolStore } from '../service/video-control.ts'
import { ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'

const loading = ref(true)
const list = ref<IVideoList[]>([])
const control = videosCtrolStore()
const message = ref('')
const getData = async (params: IFeedParams) => {
  try {
    const res = await getVideoList(params)
    // console.log(res)
    message.value = res.msg
    const { data } = res

    setTimeout(() => {
      loading.value = false
    }, 1000)

    list.value.push(...data)
    control.videosNum = list.value.length
  } catch (err) {
    // console.log(err)
    control.stopScroll = true
    ElMessage({
      message: `${message.value}🤣🤣🤣，没有更多视频了！`,
      type: 'warning'
    })
  }
}

onMounted(() => {
  //设置body为possition:fixed
  document.body.style.position = 'fixed'
  control.reset()
})
//组件销毁时，去除body的possition:fixed
onBeforeUnmount(() => {
  document.body.style.position = ''
})
//获取路由地址
// const router = useRouter()
watchEffect(() => {
  getData({
    page: control.page,
    size: control.size
  })
})
</script>
<template>
  <div class="recommend">
    <Loading :show="loading" :isShowText="true" :center="true">
      <div class="xgplayer-playswitch">
        <swiper-control />
      </div>
      <div class="slide-list" id="slidelist">
        <swiper-video :videoList="list" />
      </div>
    </Loading>
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 878px;
  overflow: hidden;
  position: relative;

  .xgplayer-playswitch {
    flex-shrink: 0;
  }
  @media only screen and (min-width: 580px) {
    .xgplayer-playswitch {
      position: absolute;
      right: 13px;
      top: calc(50% + 60px);
      transform: translateY(calc(-50% - 30px));
      z-index: 2;
    }
  }

  @media only screen and (max-width: 580px) {
    .xgplayer-playswitch {
      display: none;
    }
  }

  @media only screen and (min-width: 878px) {
    .IvL3R0Q4 {
      position: absolute;
      right: 13px;
      top: calc(50% + 60px);
      transform: translateY(calc(-50% - 30px));
      z-index: 2;
    }
  }

  .slide-list {
    display: flex;
    flex: 1 1;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .isCssFullscreen {
    height: 100%;
    left: 0px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 2000;
    background-color: #fff;
  }
}
</style>
