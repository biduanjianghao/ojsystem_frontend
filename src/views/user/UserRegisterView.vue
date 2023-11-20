<template>
  <div class="register-container">
    <div class="register-form">
      <h2 class="register-title">用户注册</h2>
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="form.userAccount" placeholder="账号" />
        </a-form-item>
        <a-form-item field="userPassword" label="密码" tooltip="密码不少于8位">
          <a-input-password v-model="form.userPassword" placeholder="密码" />
        </a-form-item>
        <a-form-item field="checkPassword" label="确认密码" tooltip="重复密码">
          <a-input-password v-model="form.checkPassword" placeholder="密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="register-button">
            注册
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
const handleSubmit = async () => {
  const userPassword = form.userPassword;
  const checkPassword = form.checkPassword;
  if (userPassword !== checkPassword) {
    message.error("两次输入密码不同");
    return;
  }
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    // 登录成功跳转到登录页 todo
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("登录失败," + res.message);
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.register-form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
}

.register-button {
  width: 100%;
}
</style>
