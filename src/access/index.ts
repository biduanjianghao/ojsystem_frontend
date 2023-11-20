import ACCESSENUM from "@/access/ACCESSENUM";
import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/CheckAccess";
import { useStore } from "vuex";

// 权限管理，通过路由中带的meta信息核对权限
router.beforeEach(async (to, from, next) => {
  const loginUser = store.state.user.loginUser;
  // console.log("登录用户信息", store.state.user.loginUser);
  //进行权限判断
  const needAccess = (to.meta?.access as string) ?? ACCESSENUM.NOT_LOGIN;

  //跳转的页面需要登录,再跳转到你要去的界面
  if (needAccess === ACCESSENUM.USER) {
    if (!loginUser || !loginUser.role) {
      next(`/user/login?redirect${to.fullPath}`);
    } else {
      next();
    }
    return;
  }
  // 需要管理员权限
  if (needAccess === ACCESSENUM.ADMIN) {
    if (!loginUser || !loginUser.role) {
      next(`/user/login?redirect=${to.fullPath}`);
    }
    if (!checkAccess(loginUser, needAccess)) {
      next("/noauth");
      return;
    }
  }
  next();
});
