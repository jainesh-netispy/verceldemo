import React, { useEffect, useState } from 'react'
import { Menu, Layout } from 'antd'
import { connect, useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import Link from 'next/link'

import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getCurrentUser } from '../../redux/actions'
import { LOCAL_STORAGE } from '../../constants'
const { SubMenu } = Menu
const { Sider } = Layout
const logo = '../../../img/logo-white.png'
import classNames from 'classnames'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
export const NavLink = props => {
  let className = classNames({
    'nav-link': true,
    'is-active': props.pathname,
  })

  return (
    <Link href={props.to}>
      <a className={className}>{props.label}</a>
    </Link>
  )
}
const DashboardHeader = () => {
  const backgroundEnabled = true
  const handleLogout = async () => {
    localStorage.removeItem('USER')
    // eslint-disable-next-line no-restricted-globals
  }
  const counter = useSelector((info: any) => info)
  const [user, setUser] = useState<any>(
    counter && counter.user && counter.user.userInfo && counter.user.userInfo.user,
  )
  // eslint-disable-next-line
  const [token, setToken] = useState<any>(
    counter && counter.user && counter.user.userInfo && counter.user.userInfo.token,
  )
  const dispatch = useDispatch<any>()

  const userInfo = JSON.parse(
    typeof window !== 'undefined' ? (localStorage.getItem(LOCAL_STORAGE.USER) as any) : null,
  )
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
  const handleClick = (e: any) => {
    // console.log(e.key);
    setCurrent(e.key)
  }
  // console.log(current,"key");

  return (
    <>
      {/* <Row
        justify="center"
        style={{
          position: "sticky",
          width: "100%",
          top: "0",
          display: "flex",
          marginBottom: "50px",
          backgroundColor: "#001529",
          zIndex: 1,
        }}
      >
        <Col xxl={2} sm={2} xs={2} />
        <Col xxl={3} sm={8} xs={12}>
          <Col className="logo" style={{ paddingTop: "10px" }}>
            <Link to="/manage/boiler/brands">
              {!backgroundEnabled && <img src="/logo.png" alt="My Boiler" />}
              {backgroundEnabled && (
                <span style={{ display: "flex" }}>
                  <img
                    src={logo}
                    alt="My Boiler"
                  />
                </span>
              )}
            </Link>
          </Col>
        </Col>

        <Col xxl={17} sm={12} xs={8}>
          <Menu
            onClick={handleClick}
            theme="dark"
            selectedKeys={[current]}
            mode="horizontal"
            style={{ padding: "10px", textAlign: "right", paddingRight: "0px" }}
          >
            <Menu.Item key="1" style={{ backgroundColor: "initial" }}>
              <NavLink to="/manage/boiler/brands">Boiler Brands</NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ backgroundColor: "initial" }}>
              <NavLink to="/manage/boiler/models">Boiler Models</NavLink>
            </Menu.Item>
            <Menu.Item key="3" style={{ backgroundColor: "initial" }}>
              <NavLink to="/manage/boiler/types">Boiler Types</NavLink>
            </Menu.Item>
            <Menu.Item key="4" className="menulist">
              <NavLink to="/manage/fuel/types">Fuel Types</NavLink>
            </Menu.Item>
            <Menu.Item key="5" className="menulist">
              <NavLink to="/manage/users">Users</NavLink>
            </Menu.Item>
            <Menu.Item key="6" style={{ backgroundColor: "initial" }}>
              <NavLink to="/manage/boiler">Boiler</NavLink>
            </Menu.Item>
            <Menu.Item key="7" className="menulist">
              <NavLink to="/manage/service">Boiler Service</NavLink>
            </Menu.Item>
            <SubMenu
              key="sub3"
              style={{
                textTransform: "capitalize",
              }}
              title={`Welcome Admin`}
              icon={
                <img
                  src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png"
                  alt="avtar"
                  width="30px"
                  height="30px"
                  style={{ marginRight: "4px", borderRadius: "20px" }}
                />
              }
            >
              <Menu.Item key="15">
                <NavLink to="/edit/profile">Edit Profile</NavLink>
              </Menu.Item>
              <Menu.Item key="16">
                <NavLink to="" onClick={handleLogout}>
                  Log Out
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={2} />
      </Row> */}

      <Sider>
        <div
          style={{
            height: '64px',
            background: '#000c17',
            overflow: 'hidden',
          }}
        >
          <div className={`text-center`} style={{ height: '64px', padding: '15px' }}>
            <img src={logo} alt="" height="40" />
          </div>
        </div>

        {userInfo && userInfo.type !== 'user' && (
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" style={{ backgroundColor: 'initial' }}>
              <NavLink to="/manage/boiler/brands" label="Boiler Brands">
                Boiler Brands
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ backgroundColor: 'initial' }}>
              <NavLink to="/manage/boiler/models" label="Boiler Models">
                Boiler Models
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3" style={{ backgroundColor: 'initial' }}>
              <NavLink to="/manage/boiler/types" label="Boiler Types">
                Boiler Types
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4" className="menulist">
              <NavLink to="/manage/fuel/types" label="Fuel Types">
                Fuel Types
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5" style={{ backgroundColor: 'initial' }}>
              <NavLink to="/manage/boiler" label="Boiler Installations">
                Boiler Installations
              </NavLink>
            </Menu.Item>
            <Menu.Item key="6" className="menulist">
              <NavLink to="/manage/service" label="Boiler Services">
                Boiler Services
              </NavLink>
            </Menu.Item>
            <Menu.Item key="7" className="menulist">
              <NavLink to="/manage/users" label="Users">
                Users
              </NavLink>
            </Menu.Item>
          </Menu>
        )}

        {userInfo && userInfo.type === 'user' && (
          <Menu theme="dark" mode="inline">
            <Menu.Item key="5" style={{ backgroundColor: 'initial' }}>
              <NavLink to="/manage/boiler" label="Boiler Installations">
                Boiler Installations
              </NavLink>
            </Menu.Item>
            <Menu.Item key="6" className="menulist">
              <NavLink to="/manage/service" label="Boiler Services">
                Boiler Services
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
      </Sider>
    </>
  )
}

export default connect()(DashboardHeader)
