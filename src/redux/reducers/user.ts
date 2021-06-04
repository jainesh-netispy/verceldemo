/**
 * @file User reducers
 * @since 1.0.0
 */

import { USER } from '../constants'
import { LOCAL_STORAGE } from '../../constants'

const { LOGIN } = USER

export interface UserInfoProps {
  verified: string
  uid: number | undefined
  updatedAt: string
  status: string
  firstName: string
  password: string
  lastName: string
  avatar: string
  email: string
  role: string
  token: string | undefined
  originalEmail: string
  loginName: string
  bio: string
  location: string
  createdAt: string
  avatarUrl: string
  username: string
}

export interface UserState {
  isLogin: boolean
  isLockScreen: boolean
  userInfo: UserInfoProps
}

const initialState: UserState = {
  isLogin: false,
  isLockScreen: false,
  userInfo: {
    verified: '', // github ?
    uid: undefined, // 用户ID
    updatedAt: '', // 注册时间
    status: '', // 简介
    firstName: '', // 昵称
    password: '', // 经过MD5加密后的密码
    lastName: '', // 登录名
    avatar: '', // 头像
    email: '',
    role: '',
    token: undefined, // 登录凭证
    originalEmail: '',
    loginName: '',
    bio: '',
    location: '',
    createdAt: '',
    avatarUrl: '',
    username: '',
  },
}

function user(state = initialState, action: any): UserState {
  switch (action.type) {
    case LOGIN:
      const userInfo = action.userInfo
      // state.isLogin = true;
      // console.log(userInfo);
      if (userInfo?.token) {
        state.isLogin = true
        /* window.localStorage.setItem("token", userInfo.token); */
        window.localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(userInfo))
        // window.localStorage.setItem(
        //   LOCAL_STORAGE.LOGIN_NAME,
        //   userInfo.loginName
        // );
      }
      return { ...state, userInfo: action.userInfo }

    default:
      return state
  }
}

export default user
