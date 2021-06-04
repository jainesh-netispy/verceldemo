/**
 * @file User Action Creator
 * @since 1.0.0
 * @author xiejiahe <xjh22222228@gmail.com>
 */
import config from '../../config'
import _ from 'lodash'
import { USER } from '../constants'
import { LOCAL_STORAGE } from '../../constants'
import {
  serviceLoginByToken,
  serviceLogout,
  serviceLogin,
  serviceAddCommunity,
  serviceCommunity,
  serviceRefCommunity,
  serviceMembers,
  serviceaddToCommunity,
  serviceDeleteUser,
  serviceResetPassword,
  serviceRegister,
  serviceUsers,
  serviceDeleteAvatar,
  serviceExportData,
  serviceCurrentUser,
  serviceUpdateUserPass,
  serviceUpdateUserInfo,
  serviceGetQue,
  serviceFileUpload,
  serviceaddToRefCommunity,
  serviceForgotPassword,
  serviceCurrentUsers,
  serviceEditPollNotification,
  serviceVerifyEmailAccount,
  servicePollNotification,
  serviceAddUser,
  serviceLoginOtpVerify,
  serviceGetEngineers,
} from '../../services'
import { Dispatch } from 'redux'
// import community from "@/views/community";

const { LOGIN } = USER

export function setUser(userInfo: any = {}) {
  console.log('userInfo:-', userInfo)
  return {
    type: LOGIN,
    userInfo: userInfo,
  }
}
export function addUser(data: any, type: any) {
  return function (dispatch: Dispatch) {
    return serviceAddUser(data, type)
  }
}
export function getPollNotification() {
  return function (dispatch: Dispatch) {
    return servicePollNotification(dispatch)
  }
}
export function resetPassword(values: any, token: any) {
  return function (dispatch: Dispatch) {
    return serviceResetPassword(values, token)
  }
}

export function deleteAvatar(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteAvatar(id)
  }
}
export function forgotPassword(values) {
  return function (dispatch: Dispatch) {
    return serviceForgotPassword(values)
  }
}
export function login(values) {
  return function (dispatch: Dispatch) {
    return serviceLogin(values)
  }
}
export function getUsers() {
  return function (dispatch: Dispatch) {
    return serviceUsers(dispatch)
  }
}
export function getExportData(type: any) {
  return function (dispatch: Dispatch) {
    return serviceExportData(type)
  }
}

export function deleteUser(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteUser(id)
  }
}
// export function editUser(data:any,type:any) {
//   return function (dispatch: Dispatch) {
//     // const val ={  "status": value}
//     return serviceEditUser(data,type);

//   };
// }
export function pollNotificationEdit(notificationId: any, userId: any, value: any) {
  return function (dispatch: Dispatch) {
    return serviceEditPollNotification(notificationId, userId, value)
  }
}

export function getCommunity(id: any) {
  return function (dispatch: Dispatch) {
    return serviceCommunity(id)
  }
}
export function getRefCommunity() {
  return function (dispatch: Dispatch) {
    return serviceRefCommunity(dispatch)
  }
}

export function getmembers(id: any) {
  return function (dispatch: Dispatch) {
    return serviceMembers(id)
  }
}
export function getQues(id: any) {
  return function (dispatch: Dispatch) {
    return serviceGetQue(id)
  }
}

export function updateUserPass(id: any, values: any, token: any) {
  return function (dispatch: Dispatch) {
    return serviceUpdateUserPass(id, values, token)
  }
}
export function updateUser(id: any, values: any) {
  return function (dispatch: Dispatch) {
    return serviceUpdateUserInfo(id, values)
  }
}
export function addToCommunity(token: any, communityId: any) {
  return async function (dispatch: Dispatch) {
    return await serviceaddToCommunity(token, communityId)
  }
}
export function addToRefCommunity(token: any, communityId: any) {
  return async function (dispatch: Dispatch) {
    return await serviceaddToRefCommunity(token, communityId)
  }
}

export function fileUpload(id: any, values: any, token: any) {
  return function (dispatch: Dispatch) {
    return serviceFileUpload(id, values, token)
  }
}

export function getCurrentUser(id: any) {
  return function (dispatch: Dispatch) {
    if (id) {
      return serviceCurrentUser(id)
    }
  }
}
export function getCurrentUserS(id: any) {
  return function (dispatch: Dispatch) {
    return serviceCurrentUsers(id)
    // .then((res: any) => {
    //   console.log(res);
    //   if (res.data.success) {
    //     const userInfo = res.data.data.userInfo;
    //     return dispatch(setUser(userInfo));
    //   }
    //   return dispatch(setUser());
    // });
  }
}

// export function getCoin() {
//   return function (dispatch: Dispatch) {
//     return serviceGetCoin(dispatch)
//     // .then((res: any) => {
//     //   console.log(res);
//     //   if (res.data.success) {
//     //     const userInfo = res.data.data.userInfo;
//     //     return dispatch(setUser(userInfo));
//     //   }
//     //   return dispatch(setUser());
//     // });
//   };
// }
export function register(values) {
  return function (dispatch: Dispatch) {
    return serviceRegister(values)
    // .then((res: any) => {
    //   console.log(res);
    //   if (res.data.success) {
    //     const userInfo = res.data.data.userInfo;
    //     return dispatch(setUser(userInfo));
    //   }
    //   return dispatch(setUser());
    // });
  }
}
export function addCommunity(values: any, id: any) {
  return function (dispatch: Dispatch) {
    const data = { user: id, members: [{ user: id }], ...values }

    return serviceAddCommunity(data)
    // .then((res: any) => {
    //   console.log(res);
    //   if (res.data.success) {
    //     const userInfo = res.data.data.userInfo;
    //     return dispatch(setUser(userInfo));
    //   }
    //   return dispatch(setUser());
    // });
  }
}

/**
 * 使用token进行登录
 */
// export function loginByToken(token: string) {
//   return function (dispatch: Dispatch) {
//     return serviceLoginByToken(token).then((res: any) => {
//       if (res.data.success) {
//         const userInfo = res.data.data.userInfo;
//         return dispatch(setUser(userInfo));
//       }
//       return dispatch(setUser());
//     });
//   };
// }

// function login(values: any) {
//   return (dispatch: Dispatch) => {
//     userService.login(values);
//   };
// }

export function loginByToken(token: string) {
  return function (dispatch: Dispatch) {
    return serviceLoginByToken(token).then((res: any) => {
      if (res.data.success) {
        console.log(res)
        const userInfo = res.data.data.userInfo
        return dispatch(setUser(userInfo))
      }
      return dispatch(setUser())
    })
  }
}
/**
 * 注销登录
 */
export function logout(history: any) {
  return function (dispatch: Dispatch) {
    return serviceLogout(history)
    // .then((res: any) => {
    //   console.log(res);
    //   if (res.data.success) {
    //     const userInfo = res.data.data.userInfo;
    //     return dispatch(setUser(userInfo));
    //   }
    //   return dispatch(setUser());
    // });
  }
  // serviceLogout().finally(() => {
  //   const localStorageWhiteList = [LOCAL_STORAGE.LOGIN_NAME];
  //   const localStorageLen = window.localStorage.length;
  //   const allLocalStorageKey: string[] = [];

  //   for (let i = 0; i < localStorageLen; i++) {
  //     const key = window.localStorage.key(i) as string;
  //     allLocalStorageKey.push(key);
  //   }

  //   allLocalStorageKey.forEach((keyName) => {
  //     if (localStorageWhiteList.indexOf(keyName) === -1) {
  //       window.localStorage.removeItem(keyName);
  //     }
  //   });
  //   window.sessionStorage.clear();
  //   // window.location.reload(true);
  // });
}

/**
 * Github Auth
 */
export function githubAuthz() {
  const url = `https://github.com/login/oauth/authorize?response_type=code&redirect_uri=${config.github.callbackURL}&client_id=${config.github.clientId}`
  window.location.replace(url)
}

/**
 * 验证本地登录状态
 */
export function validateLocalStatus() {
  let userInfo = {}
  try {
    userInfo = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER) as string)
    if (!_.isPlainObject(userInfo)) {
      userInfo = {}
    }
  } catch {}
  return setUser(userInfo)
}

export function verifyEmailAccount(token: any) {
  return function (dispatch: Dispatch) {
    return serviceVerifyEmailAccount(token)
  }
}
export function loginOtpVerify(values) {
  return function (dispatch: Dispatch) {
    return serviceLoginOtpVerify(values)
  }
}

export function getEngineers() {
  return function (dispatch: Dispatch) {
    return serviceGetEngineers()
  }
}
