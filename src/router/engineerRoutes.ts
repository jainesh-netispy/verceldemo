import { lazy } from "react";
import { IRouteProps } from "@/router/types";
import { HOME, SETTING } from "./constants";
import Login from "@/views/login/index";
import Register from "@/views/register/index";
import Forgotpassword from "@/views/forgotpassword/index";
import Resetpassword from "@/views/resetpassword/index";
import ManageBoiler from "@/views/ManageBoiler/index";
import NoMatch from "@/views/exception/no-match";
import ManageService from "@/views/ManageService";
import EditProfile from "@/views/EditProfile";
import AddService from "@/views/ManageService/AddService";
import AddBoiler from "@/views/ManageBoiler/AddBoiler";
import AddUser from "@/views/ManageUser/AddUser";  

const engineerRoutesMap: Array<IRouteProps> = [
  {
    path: HOME.LOGIN.path,
    exact: true,
    component: Login,
    meta: {
      requiresAuth: false,
      title: HOME.LOGIN.name,
      isLoginToHome: true,
    },
  },
  {
    path: HOME.MANAGEBOILER.path,
    exact: true,
    component: ManageBoiler,
    meta: {
      requiresAuth: false,
      title: HOME.MANAGEBOILER.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.MANAGESERVICE.path,
    exact: true,
    component: ManageService,
    meta: {
      requiresAuth: false,
      title: HOME.MANAGESERVICE.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.ADDSERVICE.path,
    exact: true,
    component: AddService,
    meta: {
      requiresAuth: false,
      title: HOME.ADDSERVICE.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.ADDBOILER.path,
    exact: true,
    component: AddBoiler,
    meta: {
      requiresAuth: false,
      title: HOME.ADDBOILER.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.EDITSERVICE.path,
    exact: true,
    component: AddService,
    meta: {
      requiresAuth: false,
      title: HOME.EDITSERVICE.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.EDITBOILER.path,
    exact: true,
    component: AddBoiler,
    meta: {
      requiresAuth: false,
      title: HOME.EDITBOILER.name,
     
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.EDITBOILERSERVICES.path,
    exact: true,
    component: AddBoiler,
    meta: {
      requiresAuth: false,
      title: HOME.EDITBOILERSERVICES.name,
    },
  },
  {
    path: HOME.EDITUSER.path,
    exact: true,
    component: AddUser,
    meta: {
      requiresAuth: false,
      title: HOME.EDITUSER.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.EDITPROFILE.path,
    exact: true,
    component: EditProfile,
    meta: {
      requiresAuth: false,
      title: HOME.EDITPROFILE.name,
      // isLoginToHome: true,
    },
  },
  // {
  //   path: HOME.REGISTER.path,
  //   exact: true,
  //   component: Register,
  //   meta: {
  //     requiresAuth: false,
  //     title: HOME.REGISTER.name,
  //     // isLoginToHome: true
  //   },
  // },
  {
    path: HOME.FORGOTPASSWORD.path,
    exact: true,
    component: Forgotpassword,
    meta: {
      requiresAuth: false,
      title: HOME.FORGOTPASSWORD.name,
      // isLoginToHome: true
    },
  },
  {
    path: HOME.RESETPASSWORD.path,
    exact: true,
    component: Resetpassword,
    meta: {
      requiresAuth: false,
      title: HOME.RESETPASSWORD.name,
      // isLoginToHome: true
    },
  },

  {
    path: HOME.NO_MATCH.path,
    component: NoMatch,
    meta: {
      requiresAuth: false,
      title: HOME.NO_MATCH.name,
    },
  },
];

const Base = lazy(() => import("@/views/home/setting/base"));
const InnerMessage = lazy(() => import("@/views/home/setting/inner-message"));
// const Notification = lazy(() => import("@/views/home/setting/notification"));
const Account = lazy(() => import("@/views/home/setting/account"));

export const settingRoutes: Array<IRouteProps> = [
  {
    path: SETTING.BASE.path,
    component: Base,
    meta: {
      requiresAuth: true,
      title: SETTING.BASE.name,
    },
  },
  {
    path: SETTING.INNER_MESSAGE.path,
    component: InnerMessage,
    meta: {
      requiresAuth: true,
      title: SETTING.INNER_MESSAGE.name,
    },
  },
  {
    path: SETTING.NOTIFICATION.path,
    component: Notification,
    meta: {
      requiresAuth: true,
      title: SETTING.NOTIFICATION.name,
    },
  },
  {
    path: SETTING.ACCOUNT.path,
    component: Account,
    meta: {
      requiresAuth: true,
      title: SETTING.ACCOUNT.name,
    },
  },
];

export default engineerRoutesMap;
