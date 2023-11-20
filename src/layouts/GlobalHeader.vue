<template>
  <div>
    <a-row id="globalHeader" align="center" :wrap="false">
      <a-col flex="auto">
        <div>
          <a-menu
            mode="horizontal"
            :selected-keys="selectedKey"
            @menu-item-click="doMenuClick"
          >
            <a-menu-item
              key="0"
              :style="{ padding: 0, marginRight: '38px' }"
              disabled
            >
              <div class="title-bar">
                <img class="logo" src="../assets/oj-logo.svg" />
                <div class="title">oj system</div>
              </div>
            </a-menu-item>
            <a-menu-item v-for="item in visibleRouters" :key="item.path">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <a-col flex="100px">
        <div>{{ visibleUserName }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #165cfd;
  margin-left: 12px;
}

.logo {
  height: 48px;
}
</style>
<script setup lang="ts">
import { routes } from "@/router/routers";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/CheckAccess";
import ACCESSENUM from "@/access/ACCESSENUM";

const store = useStore();
const router = useRouter();

const visibleUserName = computed(() => {
  if (!store.state.user?.loginUser?.role) {
    return "未登录";
  } else {
    return store.state.user?.loginUser?.UserName ?? "用户";
  }
});

// 需要展示的路由
const visibleRouters = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKey = ref(["/"]);

router.afterEach((to) => {
  selectedKey.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
