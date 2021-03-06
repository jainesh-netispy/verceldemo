import { lazy } from "react";
import { IRouteProps } from "../router/types";
import { HOME, SETTING } from "./constants";
import Login from "../views/login/index";
import ManageBoilerBrands from "../views/ManageBoilerBrands/index";
import ManageBoiler from "../views/ManageBoiler/index";
import ManageBoilerModels from "../views/ManageBoilerModels/index";
import ManageBoilerTypes from "../views/ManageBoilerTypes/index";
import ManageFuelTypes from "../views/ManageFuelTypes/index";
import ManageUser from "../views/ManageUser/index";
// import NoMatch from "../views/exception/no-match";
import ManageService from "../views/ManageService";
import EditProfile from "../views/EditProfile";
import AddService from "../views/ManageService/AddService";
import AddBoiler from "../views/ManageBoiler/AddBoiler";
import AddUser from "../views/ManageUser/AddUser";  

const routesMap: Array<IRouteProps> = [
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
    path: HOME.MANAGEBOILERBRANDS.path,
    exact: true,
    component: ManageBoilerBrands,
    meta: {
      requiresAuth: false,
      title: HOME.MANAGEBOILERBRANDS.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.MANAGEBOILERMODELS.path,
    exact: true,
    component: ManageBoilerModels,
    meta: {
      requiresAuth: false,
      title: HOME.MANAGEBOILERMODELS.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.MANAGEBOILERTYPES.path,
    exact: true,
    component: ManageBoilerTypes,
    meta: {
      requiresAuth: false,
      title: HOME.MANAGEBOILERTYPES.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.MANAGEFUELTYPES.path,
    exact: true,
    component: ManageFuelTypes,
    meta: {
      requiresAuth: false,
      title: HOME.MANAGEFUELTYPES.name,
      // isLoginToHome: true,
    },
  },
  {
    path: HOME.MANAGEUSERS.path,
    exact: true,
    component: ManageUser,
    meta: {
      requiresAuth: false,
      title: HOME.MANAGEUSERS.name,
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
    path: HOME.ADDUSER.path,
    exact: true,
    component: AddUser,
    meta: {
      requiresAuth: false,
      title: HOME.ADDUSER.name,
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
];


export const settingRoutes: Array<IRouteProps> = [
  
];

export default routesMap;
