<script setup lang="ts">
const props = defineProps({
  id: Number,
  username: {
    type: String,
    required: true
  },
  uploadTime: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  isPlay: {
    type: Boolean,
    required: true
  },
  img: String,
  dianzan: Number,
  comment: Number,
  shoucang: Number,
  globalVolume: Number,
  isLike: {
    type: Boolean,
    required: false
  },
  isCollect: {
    type: Boolean,
    required: false
  },
  isAttention: {
    type: Boolean,
    required: false
  }
})
</script>

<template>

</template>

<style scoped lang="scss">

</style>
