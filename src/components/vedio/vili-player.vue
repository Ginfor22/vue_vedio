<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import 'xgplayer/dist/index.min.css'

import { v4 as uuidv4 } from 'uuid'
const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  isPlay: {
    type: Boolean,
    required: false
  }
})

const player = ref<any>(null)
const uniqueId = uuidv4()
onMounted(() => {

})

onBeforeUnmount(() => {
  player.value.destroy()
})

const playerId = ref(`xgplayer-${uniqueId}`)

watch(
  () => props.isPlay,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      if (newVal) {
        player.value.play()
      } else {
        player.value.pause()
      }
    }
  }
)
console.log(props.isPlay)
</script>
<template>
  <div class="modal" ref="player" :id="playerId"></div>
</template>

<style lang="scss" scoped>
.modal {
  position: relative;
  background: transparent;
}
</style>

