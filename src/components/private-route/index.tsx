import React from 'react'
import CONFIG from '../../config'
import qs from 'query-string'
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
  matchPath,
} from 'react-router-dom'
import { IRouteProps } from '../../router/types'
import { connect } from 'react-redux'
import { StoreState } from '../../redux/index'
import { HOME } from '../../router/constants'
type Props = IRouteProps & ReturnType<typeof mapStateToProps> & RouteComponentProps

const PrivateRoute: React.FC<Props> = function ({
  component: Component,
  childrenRoutes,
  isLogin,
  dispatch,
  location,
  ...rest
}) {
  // 取消不是当前页面的所有http请求
  if (Array.isArray(window.axiosCancelTokenStore)) {
    window.axiosCancelTokenStore.forEach(store => {
      if (store.pathname !== location.pathname) {
        store.cancel()
      }
    })
    window.axiosCancelTokenStore = []
  }
  const { meta } = rest

  // console.log(window.location.pathname);
  // console.log(currentURL)
  if (meta) {
    if (meta.title) {
      document.title = `${meta.title} - ${CONFIG.title}`
    } else {
      document.title = CONFIG.title
    }
  }

  const match: any = matchPath(location.pathname, {
    path: '/community/:cid/referral/:uid',
    // exact: true,
    strict: false,
  })

  if (match?.params.uid !== undefined) {
    window.localStorage.setItem('referralId', match?.params.uid)
  }
  if (match?.params.cid !== undefined) {
    window.localStorage.setItem('communityId', match?.params.cid)
  }
  const communityId: any = window.localStorage.getItem('communityId')
  const userId = window.localStorage.getItem('referralId')
  // 验证权限
  const auth = (function () {
    if (meta?.requiresAuth) {
      if (isLogin) {
        return true
      }
      return false
    }
    return true
  })()
  if (meta?.isLoginToHome && isLogin) {
    const redirectUrl = qs.parse(location.search).redirectUrl as string

    const url = redirectUrl || HOME.MANAGEBOILERBRANDS.path

    return <Redirect to={url} />
  }

  return (
    <Route
      render={props => {
        return auth ? (
          <Component {...props} {...rest}>
            {Array.isArray(childrenRoutes) ? (
              <Switch>
                {childrenRoutes.map((route, idx: number) => (
                  <PrivateRouteComponent {...route} key={idx} />
                ))}
              </Switch>
            ) : null}
          </Component>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              // search: `${HOME.LOGIN.path}`,
            }}
          />
        )
      }}
    />
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    isLogin: state.user.isLogin,
  }
}

export const PrivateRouteComponent = connect(mapStateToProps)(withRouter(PrivateRoute))

export default PrivateRouteComponent
