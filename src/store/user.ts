import { StoreOptions } from "vuex";
import ACCESSENUM from "@/access/ACCESSENUM";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      UserName: "未登录",
      // role: ACCESSENUM.NOT_LOGIN,
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 远程登录
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", payload);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          role: ACCESSENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
