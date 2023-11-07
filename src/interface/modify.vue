<script setup lang="ts">
</script>

<template>
<div>
  <h2>{{mode==='add'?'新增':'修改'}}信息</h2>
  <form>
    <label @submit.prevent="saveDate">姓名：</label>
    <input type="text" id="name" v-model:formData.name required>
    <label>邮箱：</label>
    <input type="email" id="name" "v-model:formData.name" required>
    <label>头像：</label>
    <input type="Icon" id="name" "v-model:formData.name" required>

    <button type="submit">{{mode === 'add' ? '新增' :'保存'}}</button>
  </form>
</div>
</template>

<style scoped lang="scss">

</style>
