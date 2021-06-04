import React, { useEffect, useState } from 'react'
import { Layout, Menu, Dropdown } from 'antd'
import { connect, useDispatch, useSelector } from 'react-redux'
import { LOCAL_STORAGE } from '../../constants'
import { getCurrentUser } from '../../redux/actions'
import Link from 'next/link'
import classNames from 'classnames'

const { Sider } = Layout
const NavLink = props => {
  let className = classNames({
    'nav-link': true,
    'is-active': props.pathname,
  })
  return (
    <Link href={props.to}>
      <a className={className} onClick={props.onClick}>
        {props.label}
      </a>
    </Link>
  )
}
const DashboardTopBar = () => {
  const backgroundEnabled = true
  const handleLogout = async () => {
    console.log('logout')
    localStorage.removeItem('USER')
    location.href = '/login'
  }
  const userInfo = JSON.parse(
    typeof window !== 'undefined' ? (localStorage.getItem(LOCAL_STORAGE.USER) as any) : null,
  )

  const counter = useSelector((info: any) => info)
  const [user, setUser] = useState<any>(
    counter && counter.user && counter.user.userInfo && counter.user.userInfo.user,
  )
  // eslint-disable-next-line
  const [token, setToken] = useState<any>(
    counter && counter.user && counter.user.userInfo && counter.user.userInfo.token,
  )
  const dispatch = useDispatch<any>()
  const getUserDetails = () => {
    try {
      const id = user && user._id
      dispatch(getCurrentUser(id)).then((res: any) => {
        setUser(res && res.data && res.data.data)
        // setUserData(res && res.data && res.data.data);
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserDetails()
    // eslint-disable-next-line
  }, [])
  const [current, setCurrent] = useState<any>('1')

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <NavLink to="/edit/profile" label="Profile">
          Profile
        </NavLink>
        <NavLink to="/login" onClick={handleLogout} label="Logout">
          Logout
        </NavLink>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Layout.Header
        style={{
          borderBottom: '1px solid #e4e9f0',
          display: 'inline-table',
          boxShadow: 'none',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '0 1.53rem',
            minHeight: '64px',
            height: '64px',
            color: '#74708d',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}
        >
          <div className="ml-auto" />
          <Dropdown overlay={menu} trigger={['click']}>
            <div className="dropdown">
              <div className="ml-2 d-none d-sm-inline-block">
                Hello, {userInfo ? userInfo.name : 'Admin'}
              </div>
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
    </>
  )
}

export default connect()(DashboardTopBar)
