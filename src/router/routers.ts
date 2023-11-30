import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import AddQuestionView from "@/views/questions/AddQuestionView.vue";
import ManageQuestionView from "@/views/questions/ManageQuestionView.vue";
import QuestionView from "@/views/questions/QuestionView.vue";
import ACCESSENUM from "@/access/ACCESSENUM";
import ViewQuestionView from "@/views/questions/ViewQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: QuestionView,
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionView,
  },
  // {
  //   path: "/question_submit",
  //   name: "浏览题目提交",
  //   component: QuestionSubmitView,
  // },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESSENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESSENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESSENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question/",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESSENUM.ADMIN,
    },
  },

  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
];
