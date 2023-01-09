<template>
  <div class="loginWrap flex-center">
    <div class="content">
      <div class="login flex-center">
        <div class="loginInput">
          <div class="loginTitle">
            <span class="f32 flex-center">xx后台管理系统</span>
          </div>

          <div class="userName">
            <el-form ref="ruleFormRef" :model="userLogin" :rules="loginRules">
              <el-form-item prop="username" class="mt40">
                <el-input
                  v-model="userLogin.username" size="large" placeholder="请输入账号"
                  :prefix-icon="UserFilled" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="userLogin.password" size="large" placeholder="请输入密码" type="password"
                  :prefix-icon="Lock"
                  @keyup.enter="getLogin" />
              </el-form-item>
              <el-form-item v-if="captchaEnabled" prop="code">
                <div class="flex-space">
                  <el-input
                    v-model="userLogin.code"
                    size="large"
                    placeholder="验证码"
                    :prefix-icon="Iphone"
                    style="width: 63%"
                    @keyup.enter="getLogin"
                  />

                  <img :src="state.codeUrl" class="login-code-img" @click="getCode">
                </div>
              </el-form-item>
              <el-form-item>
                <el-button v-if="loadBtn===false" type="primary" round @click="getLogin">
                  登录
                </el-button>
                <el-button v-else type="primary" :loading="loadBtn">登录中...</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <span class="identifying">Copyright &copy; 2023 版权所有 xxx技发展有限公司</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { UserFilled, Lock, Iphone } from '@element-plus/icons-vue'
import { loginService } from '@/api/login/login'
const loadBtn = ref<boolean>(false)
const userLogin = reactive<{
  username: string,
  password: string,
  rememberMe: boolean,
  code: string,
  uuid: string
}>({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
})
// 验证码开关
const captchaEnabled = ref<boolean>(true)
const state = reactive<{codeUrl:string}>({
  codeUrl: ''
})
// 表单校验
const loginRules = reactive({
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})
onMounted(() => {
  getCode()
})
function getCode () {
  loginService.getCodeImg().then(res => {
    captchaEnabled.value = res?.captchaEnabled === undefined ? true : res?.captchaEnabled
    if (captchaEnabled.value) {
      state.codeUrl = 'data:image/gif;base64,' + res?.img
      userLogin.uuid = res?.uuid
    }
  })
}
const ruleFormRef = ref()
function getLogin () {
  ruleFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loadBtn.value = true
      loginService.login(userLogin).then(res => {
      }).finally(() => {
        loadBtn.value = false
      })
    }
  })
}

</script>

<style scoped lang="scss">
:deep(.el-input__icon){
  font-size: 18px;
  margin-left: 10px;
}

:deep(.el-button) {
  width: 340px;
  height: 45px;
  font-size: 18px;
  box-shadow: 0px 2px 5px 0px rgba(10, 144, 2, 0.34);
  border-radius: 24px;
}

.loginWrap {
  flex-direction: column;
  overflow: hidden;
  background: url("../../assets/image/bg.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;

  .content {
    margin-top: 90px;
    overflow: hidden;
    width: 1188px;
    height: 790px;
    min-height: 500px;
    background: url("../../assets/image/login.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .login {
      width: 660px;
      height: 680px;
      box-sizing: border-box;

      .loginInput {
        height: 100%;
        width: 340px;
        margin-left: 20px;

        .loginTitle {
          font-weight: 400;
          color: #333333;
          margin: 138px 0 59px 0;
        }
      }
      .login-code-img{
        height: 38px;
        width: 120px;
      }
    }
  }

  .identifying {
    margin-top: 35px;
  }
}
</style>
