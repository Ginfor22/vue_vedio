<script setup lang="ts">
import {} from 'vue'
import SvgIcon from "../common/svg-icon.vue";
</script>
<template>
  <div class="discover-bottom">
    <slot></slot>
    <svg-icon class="icon" icon="discover-bottom-arrow" />
  </div>
</template>

<style lang="scss" scoped>
.discover-bottom {
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: rgba(22, 24, 35, 0.34);
  cursor: pointer;
  display: flex;
  font-size: 13px;
  height: 40px;
  justify-content: center;
  line-height: 21px;
  text-align: center;

  .icon {
    width: 10px;
    height: 7px;
    margin-left: 4px;
    transform: rotate(0);
    transition: transform 0.3s;
    color: rgba(22, 24, 35, 0.34);
  }
}
</style>
