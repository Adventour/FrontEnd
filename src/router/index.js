import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/AppMain"),
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/AppBoard"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "write",
        name: "boardwrite",
        component: () => import("@/components/board/BoardWrite"),
      },
      {
        path: "view/:articleNo",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "modify",
        name: "boardmodify",
        component: () => import("@/components/board/BoardModify"),
      },
      {
        path: "delete/:articleNo",
        name: "boarddelete",
        component: () => import("@/components/board/BoardDelete"),
      },
    ],
  },
  {
    path: "/member/join",
    name: "memberjoin",
    component: () => import("@/components/member/MemberJoin"),
  },
  {
    path: "/member/login",
    name: "memberlogin",
    component: () => import("@/components/member/MemberLogin"),
  },
  {
    path: "/member/profile",
    name: "memberprofile",
    component: () => import("@/components/member/MemberProfile"),
  },
  {
    path: "/member/modify",
    name: "membermodify",
    component: () => import("@/components/member/MemberModify"),
  },
  {
    path: "/plan",
    name: "planlist",
    component: () => import("@/components/plan/PlanList"),
  },
  {
    path: "/plan/modify",
    name: "planmodify",
    component: () => import("@/components/plan/PlanModify"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
