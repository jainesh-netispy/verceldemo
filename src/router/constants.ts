export const SETTING = {
  BASE: { name: "", path: "/home/setting/base" },
  INNER_MESSAGE: { name: "", path: "/home/setting/innerMessage" },
  NOTIFICATION: { name: "", path: "/home/setting/notification" },
  ACCOUNT: { name: "", path: "/home/setting/account" },
};

export const HOME = {
  LOGIN: { name: "Login", path: ["/", "/login"] },
  // REGISTER: { name: "Register", path: ["/register"] },
  FORGOTPASSWORD: { name: "Forgot-password", path: ["/forgot"] },
  RESETPASSWORD: { name: "Reset-password", path: `/reset-password/:token` },
  VERIFYACCOUNT: { name: "Verify-account", path: `/email-verify/:token` },
  // TOPCRYPTOS: { name: "Topcryptos", path: "/topcrypto" },
  MANAGEBOILERBRANDS: { name: "ManageBoilerBrands", path: "/manage/boiler/brands" },
  MANAGEBOILER: { name: "ManageBoiler", path: "/manage/boiler" },
  MANAGEBOILERMODELS: { name: "ManageBoilerModels", path: "/manage/boiler/models" },
  MANAGEBOILERTYPES: { name: "ManageBoilerTypes", path: "/manage/boiler/types" },
  MANAGEFUELTYPES: { name: "ManageFuelTypes", path: "/manage/fuel/types" },
  MANAGEUSERS: { name: "UserList", path: "/manage/users" },
  MANAGESERVICE: { name: "Service Records", path: "/manage/service" },
  EDITPROFILE: { name: "Edit profile", path: "/edit/profile" },
  ADDSERVICE: { name: "Add Service", path: "/add/service/:id" },
  ADDBOILER: { name: "Add Boiler", path: "/add/boiler" },
  ADDUSER: { name: "Add User", path: "/add/user" },
  EDITSERVICE: { name: "Edit Service", path: "/edit/service/:eid" },
  EDITBOILER: { name: "Edit Boiler", path: "/boiler/details/save/:id" },
  EDITBOILERSERVICES: { name: "Edit Boiler", path: "/boiler/service/details/:id" },
  EDITUSER: { name: "Edit User", path: "/edit/user/:id" },
  HOME: { name: "", path: "/home" },
  HOME_INDEX: { name: "", path: "/home/index" },
  REMINDER: { name: "", path: "/home/reminder" },
  SETTING_INDEX: { name: "", path: "/home/setting" },
  TODAY_TASK: { name: "", path: "/home/todayTask" },
  MEMORANDUM: { name: "", path: "/home/memorandum" },
  MEMORANDUM_CREATE: {
    name: "",
    path: ["/home/memorandum/create", "/home/memorandum/update/:id"],
  },
  MEMORANDUM_DETAIL: { name: "*", path: "/home/memorandum/detail/:id" },
  CAPITAL_FLOW: { name: "", path: "/home/capitalFlow" },
  CAPITAL_FLOW_TYPE: { name: "", path: "/home/capitalFlow/type" },
  TODO_LIST: { name: "", path: "/home/todoList" },
  NO_MATCH: { name: "404 Not Found", path: "*" },
};