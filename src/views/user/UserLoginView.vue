<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">用户登录</h2>
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="form.userAccount" placeholder="账号" />
        </a-form-item>
        <a-form-item field="userPassword" label="密码" tooltip="密码不少于8位">
          <a-input-password v-model="form.userPassword" placeholder="密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-button">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  console.log(res);
  const userName = res.data.userName;
  const userRole = res.data.userRole;
  // 登录成功跳转到之前需要权限的页面
  const redirect = (router.currentRoute.value.query.redirect as string) ?? "/";
  if (res.code === 0) {
    // 登录成功跳转到主页
    await store.dispatch("user/getLoginUser", {
      UserName: userName,
      role: userRole,
    });

    router.push({
      path: redirect,
      replace: true,
    });
  } else {
    message.error("登录失败," + res.message);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.login-form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
}
</style>
