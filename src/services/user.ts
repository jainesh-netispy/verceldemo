import http from '../utils/http'
import api from '../api'
import Axios from 'axios'
import { notification } from 'antd'
// 通过账号密码登录
// export function serviceLogin(data: object) {
//   return http.post(api.login, data);
// }
import { LOCAL_STORAGE } from '../constants'
import { unAuthorized } from '../utils/helper'

const openNotification = error => {
  notification.open({
    message: 'Error',
    type: 'error',
    description: error,
  })
}

export const serviceResetPassword = async (values: any, token: any) => {
  try {
    const result = await Axios.post(api.resetpassword + token, values)
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceForgotPassword = async (values: any) => {
  try {
    const result = await Axios.post(api.forgotpassword, values)
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceLogin = async (values: any) => {
  try {
    const result = await Axios.post(api.login, values)
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceExportData = async (type: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    let option = {}
    if (type === 'pdf') {
      option = {
        Authorization: `Bearer ${userToken}`,
        responseType: 'arraybuffer',
      }
    } else {
      option = {
        Authorization: `Bearer ${userToken}`,
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }
    }

    const result = await Axios.get(api.exportdata + type, {
      headers: option,
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceUsers = async (values: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.users, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const servicePollNotification = async (value: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const userId = userInfo && userInfo.user && userInfo.user._id
    const result = await Axios.get(api.pollNotification + userId, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceCurrentUsers = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.ediUsersDetails + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceDeleteAvatar = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.delete(api.removeAvatar + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceDeleteUser = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.delete(api.deleteUser + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceEditPollNotification = async (notificationId: any, userId: any, value: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.put(
      api.updateuser + userId + '/notification/' + notificationId,
      value,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceRefCommunity = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const userId = userInfo && userInfo.user && userInfo.user._id
    const result = await Axios.get(api.refcommunity + userId, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceCommunity = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.community + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceGetQue = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.firstpollget + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceMembers = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.community + id + `/get-member`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceaddToRefCommunity = async (userToken: any, communityId: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.post(api.community + communityId, '', {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceaddToCommunity = async (userToken: any, communityId: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.post(api.community + communityId, '', {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceUpdateUserPass = async (id: any, values: any, userToken: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.post(api.updateuserpass, values, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceUpdateUserInfo = async (id: any, values: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.put(api.updateuser + id, values, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceFileUpload = async (id: any, values: any, userToken: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.put(api.updateuser + id, values, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceAddUser = async (value: any, type: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result =
      type == 'Add'
        ? await Axios.post(api.addUser, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        : await Axios.put(api.editUser, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
    //  await Axios.post(api.addBoilerBrand, value, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    return result
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
  // try {
  //   const userInfo = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE.USER) as any
  //   );

  //   const userToken = userInfo && userInfo.token ? userInfo.token : "";
  //   const result = await Axios.post(api.addBoilerBrand, value, {
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return result;
  // } catch (error) {
  //   //  if(error&&error.response&&error.response.status===401){
  //   //   unAuthorized()
  //   // }
  //   openNotification(
  //     error
  //       ? error.response
  //         ? error.response.data
  //           ? error.response.data.message
  //           : ""
  //         : ""
  //       : ""
  //   );
  // }
}
export const serviceCurrentUser = async (id: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.currentuser + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceRegister = async (values: any) => {
  try {
    const result = await Axios.post(api.register, values)
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceAddCommunity = async (data: any) => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.post(api.addcommunity, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export function serviceLoginByToken(token: string) {
  return http.get(api.loginByToken, {
    params: { token },
  })
}
export function serviceLogout(history: any) {
  const localStorageWhiteList = [LOCAL_STORAGE.LOGIN_NAME]
  const localStorageLen = window.localStorage.length
  // console.log(localStorageLen);
  const allLocalStorageKey: string[] = []

  for (let i = 0; i < localStorageLen; i++) {
    const key = window.localStorage.key(i) as string
    allLocalStorageKey.push(key)
  }

  allLocalStorageKey.forEach(keyName => {
    if (localStorageWhiteList.indexOf(keyName) === -1) {
      window.localStorage.removeItem(keyName)
    }
  })
  window.sessionStorage.clear()
  history.push('/login')
  window.location.reload(true)

  return localStorage.removeItem('userInfo')
}

export function serviceUpdateUser(data: object) {
  return http.post(api.updateUser, data, {
    headers: { successAlert: true },
  })
}

export function serviceGetUserConfig() {
  return http.get(api.getUserConfig)
}
export function serviceUpdateUserConfig(data: object) {
  return http.put(api.getUserConfig, data, {
    headers: { successAlert: true },
  })
}

export const serviceVerifyEmailAccount = async (token: any) => {
  try {
    const result = await Axios.post(api.verifyEmailAccount + token)
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceLoginOtpVerify = async (values: any) => {
  try {
    const result = await Axios.post(api.loginOtpVerify, values)
    return result
  } catch (error) {
    // if (error && error.response && error.response.status === 401) {
    //   unAuthorized();
    // }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceGetEngineers = async () => {
  try {
    const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.serviceEngineersList, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
