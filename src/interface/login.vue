<script setup lang="ts">
import {} from 'vue'
import { userStore } from '.././service/user.ts'
import { ref } from 'vue'
import {createStore} from "element-plus/es/components/table/src/store/helper";
const activeName = ref('pass')
const email = ref('')
const code = ref('')

const password = ref('')
console.log(email, code)
const handleLogin = (email: string, code: string) => {
  console.log(email, code)
  // 调用登录接口
  const store = userStore()
  store.login({ email, code })
}
const handleLogin1 = (email: string, password: string) => {
  // 调用登录接口
  const store = userStore()
  store.login({email, password})
}

const countdown = ref(0)
const handleSendCode = (email: any) => {
  // 调用发送验证码接口
  const store = userStore()
  store.postCode(email)
  countdown.value = 60
  const intervalId = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(intervalId) // clear the interval when the countdown reaches zero
    }
  }, 1000)
}
</script>
<template>
  <div class="login">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="扫码登录" name="qr">
        <div class="qr">
          <div class="qr-content">
            <img
                alt=""
                src="data:image/jpeg;base64,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"
                class="web-login-scan-code"
                tabindex="0"
                aria-label="二维码"
            />

            <div class="web-login-scan-desc-text">
              <div>
                打开
                <span class="web-login-scan-desc-text-sub">「APP」</span
                >扫描二维码登录
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="验证码登录" name="code">
        <div class="code-login">
          <el-form>
            <el-form-item>
              <el-input placeholder="邮箱" v-model="email">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入验证码" v-model="code">
                <template #append>
                  <button @click="handleSendCode(email)">
                    <template v-if="!countdown">获取验证码</template>
                    <template v-else>{{ countdown }} 秒后重新获取</template>
                  </button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <div class="web-login-confirm-info">
                <span class="web-login-confirm-info__before-text">同意</span>
                <a
                    target="_blank"
                    href="https://www.douyin.com/agreements/?id=6773906068725565448"
                    class="web-login-confirm-info__info"
                >用户协议
                </a>
                <span class="web-login-confirm-info__connect-text">和</span>
                <a
                    target="_blank"
                    href="https://www.douyin.com/agreements/?id=6773901168964798477"
                    class="web-login-confirm-info__info"
                >隐私政策
                </a>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleLogin(email, code)" :disabled="!email || !code"
              >登录/注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <el-tab-pane label="密码登录" name="pass">
        <div class="pass-login">
          <el-form>
            <el-form-item>
              <el-input placeholder="邮箱" v-model="email"/>
            </el-form-item>
            <el-form-item>
              <el-input
                  placeholder="请输入密码"
                  type="password"
                  show-password
                  v-model="password"
                  @keyup.enter="handleLogin1(email, password)"
              >
                <template #append>忘记密码</template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <div class="web-login-confirm-info">
                <span class="web-login-confirm-info__before-text">同意</span>
                <a
                    target="_blank"
                    href="https://www.douyin.com/agreements/?id=6773906068725565448"
                    class="web-login-confirm-info__info"
                >用户协议
                </a>
                <span class="web-login-confirm-info__connect-text">和</span>
                <a
                    target="_blank"
                    href="https://www.douyin.com/agreements/?id=6773901168964798477"
                    class="web-login-confirm-info__info"
                >隐私政策
                </a>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                  @click="handleLogin1(email, password)"
                  :disabled="!email || !password"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: relative;
  border-radius: 12px;
  min-height: 446px;
  width: 404px;
  &::before {
    background: hsla(0, 0%, 100%, 0.9);
    border-radius: 12px;
    box-shadow: 0 0 60px rgba(226, 97, 89, 0.2);
    content: '';
    height: 423px;
    left: 0;
    position: absolute;
    top: 7px;
    width: 405px;
  }
  :deep(.el-tabs) {
    border-radius: 12px;
    overflow: visible;
    width: 100%;
    min-height: 446px;

    .el-tabs__content {
      overflow: visible;
    }
  }

  :deep(.el-tabs__header) {
    // height: 64px;
    margin: 0 auto;
    border-bottom: 1px solid #f1f2f5;
    align-items: center;

    .el-tabs__nav {
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      padding: 0 25px;
      width: 100%;
    }

    .el-tabs__item.is-active {
      border-bottom: 3px solid #fe2c55;
      color: #161823 !important;
      font-weight: 500;
    }
    .el-tabs__item:hover {
      color: #161823 !important;
      cursor: pointer;
    }

    .el-tabs__active-bar {
      height: 0;
    }
    .el-tabs__item {
      color: #161823;
      cursor: default;
      font-size: 18px;
      font-weight: 400;
      height: 77px;
      line-height: 77px;
      outline: none;
      position: relative;
      text-align: center;
      width: 90px;
      display: flex;
      padding: 0;
      justify-content: center;
    }

    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
.qr {
  border: none;
  margin-top: 0;
  padding: 0 32px;
  .qr-content {
    border: 1px solid #f2f2f4;

    border-radius: 6px;
    height: 183px;
    margin: 33px auto 0;
    margin-top: 48px;
    padding: 1px;
    position: relative;
    width: 183px;

    .web-login-scan-code {
      border-radius: 6px;
      height: 100%;
      width: 100%;
    }
    .web-login-scan-desc-text {
      color: rgba(22, 24, 35, 0.75);
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.6px;
      line-height: 24px;
      margin-top: 27px;
      text-align: center;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .web-login-scan-desc-text-sub {
        color: #fe2c55;
      }
    }
  }
}
.code-login {
  margin-top: 48px;
  .el-form {
    padding: 0 55px;
    width: 100%;
    // width: 308px;

    .el-input {
      background: #f2f2f4;
      border: none;
      border-radius: 4px;
      color: rgba(22, 24, 35, 0.34);
      height: 52px;
      line-height: 24px;
      padding: 8px 20px 8px 10px;

      :deep(.el-input__wrapper) {
        border: none;
        background: none;
        height: 100%;
        box-shadow: none;
        .el-input__inner {
          background: none;
          border: none;
          box-shadow: none;
        }
        &:hover {
          border: none;
          box-shadow: none;
        }
      }
      :deep(.el-input__wrapper.is-focus) {
        border: none;
        box-shadow: none;

        .el-input__inner {
          background: none;
          border: none;
          box-shadow: none;
        }
      }
      :deep(.el-input-group__append, .el-input-group__prepend) {
        background: none;
        border: none;
        box-shadow: none;
        padding: 0;

        &:hover {
          color: #000;
        }
      }
    }

    .web-login-confirm-info {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      .web-login-confirm-info__before-text {
        color: #999;
      }
      .web-login-confirm-info__info {
        // color: rgba(22, 24, 35, 0.34);
        color: rgba(22, 24, 35, 0.75);
        margin: 0 6px;
      }
      .web-login-confirm-info__connect-text {
        color: #999;
      }
    }

    .el-button {
      background: #fe2c55;
      font-weight: 500;
      height: 48px;
      line-height: 48px;
      vertical-align: middle;

      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      outline: none;
      text-align: center;
      width: 100%;
    }

    .el-button.is-disabled {
      background: #ffc2c6;
      cursor: default;
    }
  }
}
.pass-login {
  margin-top: 48px;
  .el-form {
    padding: 0 55px;
    width: 100%;
    // width: 308px;

    .el-input {
      background: #f2f2f4;
      border: none;
      border-radius: 4px;
      color: rgba(22, 24, 35, 0.34);
      height: 52px;
      line-height: 24px;
      padding: 8px 20px 8px 10px;

      :deep(.el-input__wrapper) {
        border: none;
        background: none;
        height: 100%;
        box-shadow: none;
        .el-input__inner {
          background: none;
          border: none;
          box-shadow: none;
        }
        &:hover {
          border: none;
          box-shadow: none;
        }
      }
      :deep(.el-input__wrapper.is-focus) {
        border: none;
        box-shadow: none;

        .el-input__inner {
          background: none;
          border: none;
          box-shadow: none;
        }
      }
      :deep(.el-input-group__append, .el-input-group__prepend) {
        background: none;
        border: none;
        box-shadow: none;
        padding: 0;
        color: #ff2c55;

        &:hover {
          color: #d21b46;
        }
      }
    }

    .web-login-confirm-info {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      .web-login-confirm-info__before-text {
        color: #999;
      }
      .web-login-confirm-info__info {
        // color: rgba(22, 24, 35, 0.34);
        color: rgba(22, 24, 35, 0.75);
        margin: 0 6px;
      }
      .web-login-confirm-info__connect-text {
        color: #999;
      }
    }

    .el-button {
      background: #fe2c55;
      font-weight: 500;
      height: 48px;
      line-height: 48px;
      vertical-align: middle;

      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      outline: none;
      text-align: center;
      width: 100%;
    }

    .el-button.is-disabled {
      background: #ffc2c6;
      cursor: default;
    }
  }
}
</style>
