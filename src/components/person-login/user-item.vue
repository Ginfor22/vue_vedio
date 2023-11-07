<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import switchButton from '../button/switch-button.vue'
import { userStore } from '../../service/user.ts'
const isLogin = ref(false)

const avatar = ref('../assets/logo.svg')

const store = userStore()

watchEffect(() => {
  isLogin.value = store.isLogin()
  avatar.value = store.userInfo.userAvatar
})
function handle(){


}
</script>

<template>
  <div class="user-detail-header">
    <div class="user-avatar">
      <el-avatar v-if="isLogin" :size="112" :src="avatar"/>
      <svg-icon v-if="!isLogin" class="icon" icon="user-avatar"/>
    </div>
    <div class="user-info">
      <div class="user-name">
        <h1 class="user-name-noin" v-if="!isLogin">未登录</h1>
        <h1 class="user-name-login" v-if="isLogin">
          <span>{{ store.userInfo.username }}</span>
        </h1>
      </div>
      <div class="user-info-detail">
        <div class="user-item">
          <template v-if="!isLogin">
            <p class="user-text">关注</p>
            <p class="user-line">-</p>
          </template>
          <template v-else>
            <div class="user-info-text">关注</div>
            <div class="user-number">0</div>
          </template>
        </div>
        <div class="user-item">
          <template v-if="!isLogin">
            <p class="user-text">粉丝</p>
            <p class="user-line">-</p>
          </template>
          <template v-else>
            <div class="user-info-text">粉丝</div>
            <div class="user-number">0</div>
          </template>
        </div>
        <div class="user-item">
          <template v-if="!isLogin">
            <p class="user-text">获赞</p>
            <p class="user-line">-</p>
          </template>
          <template v-else>
            <div class="user-info-text">获赞</div>
            <div class="user-number">0</div>
          </template>
        </div>
        <div class="user-item">
         <button @click="handle">编辑</button>
        </div>
      </div>
      <p v-if="isLogin" class="user-account">
        <span class="user-account-num">
          抖音号：{{ store.userInfo.userNum }}
        </span>
        <span class="user-account-addr"
        >ip属地: {{ store.userInfo.ipLocation }}</span
        >
        <template v-if="store.userInfo.gender !== null">
          <span class="user-account-info">
            <svg-icon
                v-if="store.userInfo.gender === '女'"
                icon="small-woman"
                class="user-account-icon"
            />
            <svg-icon
                v-if="store.userInfo.gender === '男'"
                icon="small-man"
                class="user-account-icon"
            />
            <span v-if="store.userInfo.birthdate !== null"
            >{{
                Math.ceil(
                    (Date.now() - new Date(store.userInfo.birthdate).getTime()) /
                    31557600000
                )
              }}岁</span
            >
          </span>
        </template>

        <template v-if="store.userInfo.location !== null">
          <span class="user-account-info">{{ store.userInfo.location }}</span>
        </template>
        <template v-if="store.userInfo.school !== null">
          <span class="user-account-info">{{ store.userInfo.school }}</span>
        </template>
      </p>
      <p v-if="isLogin" class="user-signature">
        <span> {{ store.userInfo.signature }}</span>
      </p>
    </div>

    <div class="trust-login-switch" v-if="isLogin">
      <div class="trust-login-tips-left">
        <div class="trust-login-tips-icon">
          <svg
              width="15"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class=""
              viewBox="0 0 15 16"
          >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.5 15.473a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm.034-12c-.956 0-1.842.367-2.45 1.076-.076.089-.162.22-.243.36-.209.357-.056.805.308.999l.027.014c.396.211.842-.003 1.114-.36.3-.393.715-.588 1.244-.588.787 0 1.338.327 1.338.992 0 .536-.427.94-.91 1.371l-.03.028c-.517.469-1.05.953-1.277 1.857-.01.04-.02.088-.028.14-.077.464.31.86.779.86.423 0 .753-.33.858-.74a.984.984 0 01.027-.092c.185-.512.535-.848.885-1.152.676-.6 1.324-1.227 1.324-2.272 0-1.619-1.366-2.493-2.966-2.493zm-.034 7.5a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                fill="#2F3035"
                fill-opacity="0.4"
            ></path>
          </svg>
        </div>
      </div>
      <switch-button/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
