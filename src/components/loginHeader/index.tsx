import React, { useEffect, useState } from 'react'
import { Row, Col, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { sound } from '../../constants/general'
import { getCurrentUser } from '../../redux/actions'

import Avatar from 'antd/lib/avatar/avatar'
const { SubMenu } = Menu
type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
// import logo from '@/assets/img/myBoiler.png';

const LoginHeader = () => {
  // const backgroundEnabled = true
  // const handleLogout = async () => {
  //   sound()
  //   localStorage.removeItem('USER')
  //   // eslint-disable-next-line no-restricted-globals
  //   location.href = '/login'
  // }
  const counter: any = useSelector((info: any) => info)
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
      if (id) {
        dispatch(getCurrentUser(id)).then((res: any) => {
          setUser(res && res.data && res.data.data)
          // setUserData(res && res.data && res.data.data);
        })
      }
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
      <Row className="ml-4 mt-4">
        <Col>
          <img
            src={'../../../img/myBoiler.png'}
            // src="/lollgo-icon.png"
            alt="My Boiler"
            width="230px"
            height="60px"
          />
        </Col>
      </Row>
      <Row justify="center" className="mt-4 ">
        <h1 className="bolder myBoiler-color">Welcome To My Boiler Panel</h1>
      </Row>
    </>
  )
}

export default connect()(LoginHeader)
