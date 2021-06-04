import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import { isEmpty } from 'lodash'
import { Button, Input, message, Form, notification, Card, Row, Col, Modal } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { DispatchProp, connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { loginByToken, setUser, login, loginOtpVerify } from '../../redux/actions'
import { HOME } from '../../router/constants'
import { LOCAL_STORAGE, sound } from '../../constants'
import moment from 'moment'
import ReCAPTCHA from 'react-google-recaptcha'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
// import logo from "@/assets/img/myBoiler.png";
import LoginHeader from '../../components/loginHeader'
import FooterLogin from '../../components/loginFooter'
import Router from 'next/router'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

let recaptchaRef: any = ''

const Login: React.FC<LoginProps> = function ({ dispatch, history, location }) {
  const backgroundEnabled = true
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [visible, setVisible] = useState(false)
  const [redirectUrl] = useState(() => {
    const url = qs.parse(location && location.search).redirectUrl as string
    return url || HOME.MANAGEBOILERBRANDS.path
  })

  const handleSubmit = async (values: any) => {
    try {
      const values = await form.validateFields()
      const data = { ...values, type: 'admin' }
      setLoading(true)
      dispatch(login(data)).then((res: any) => {
        setLoading(false)
        if (res !== undefined) {
          setEmail(values.email)
          setVisible(true)
          /*  const userInfo = res.data.data;
          return dispatch(setUser(userInfo)); */
        }
        if (res === undefined) {
          recaptchaRef.reset()
        }
        // return dispatch(setUser());
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleOtpSubmit = async () => {
    const values2 = await form.validateFields()
    const data = { ...values2, email }
    dispatch(loginOtpVerify(data)).then((res: any) => {
      if (res !== undefined) {
        const userInfo = res.data.data
        console.log('userInfo: ', userInfo)
        localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(userInfo))
        Router.push(HOME.MANAGEBOILERBRANDS.path)
        return dispatch(setUser(userInfo))
      }
    })
  }

  useEffect(() => {
    const query = qs.parse(location && location.search)
    const { token, state } = query

    if (Number(state) === 0) {
      message.error('Authorization failed, please log in again')
      return
    }

    if (token) {
      dispatch(loginByToken(token as string)).then(res => {
        if (!isEmpty(res.userInfo)) {
          console.log('code here')

          // history.replace(redirectUrl)
        }
      })
    }
  }, [history, location && location.search, dispatch, redirectUrl])

  return (
    <>
      <LoginHeader />
      <Row justify="center" className="mt-4">
        <Col sm={15} xs={24} xl={10} xxl={8} lg={12}>
          <Card
            style={{ borderRadius: '10px' }}
            bodyStyle={{
              background: '#33325E',
              borderRadius: 'inherit',
              padding: '40px',
            }}
          >
            <h2
              className="text-primary"
              style={{
                borderLeft: '1px solid #e48c31',
                paddingLeft: '10px',
                color: 'white',
              }}
            >
              WELCOME BACK, PLEASE LOGIN TO YOUR ACCOUNT
            </h2>{' '}
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="mt-3 "
              autoComplete="random-string"
            >
              <Form.Item
                name="email"
                className="loginForm"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input email!',
                  },
                  {
                    // type: "email",
                    message: 'Please enter valid email.',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="form_icons" />}
                  placeholder="Please enter email"
                />
              </Form.Item>

              <div className="form-actions">
                <Button
                  onClick={sound}
                  className="login-form-button btn btn-squared btn-primary datapuppet-button"
                  htmlType="submit"
                  loading={loading}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      <Modal
        title="OTP Verification"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={'30%'}
        footer=""
      >
        <Form form={form} layout="vertical" onFinish={handleOtpSubmit} autoComplete="random-string">
          <Form.Item
            name="otp"
            label="OTP Code"
            rules={[
              {
                required: true,
                message: 'Please input OTP code!',
              },
            ]}
          >
            <Input size="large" placeholder="Please enter otp" />
          </Form.Item>

          <div className="form-actions">
            <Row className="f-nowrap">
              <Col>
                <Button
                  className="login-form-button btn btn-squared btn-primary datapuppet-button mt-2"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>

      <FooterLogin />
    </>
  )
}

export default connect()(Login)

// <Layout>
//   <Layout.Content>
//     <div
//       className={backgroundEnabled ? "layout light" : `layout`}
//       style={{
//         minHeight: "100vh",
//         background: "#35527f",
//       }}
//     >
//       <div className="content">
//         <div className="header">
//           <div className="logo">
//             <Link to="/">
//               {!backgroundEnabled && (
//                 <img
//                   // src="/logo.png"
//                   src={logo}
//                   alt={myBoilerLabel}
//                 />
//               )}
//               {backgroundEnabled && (
//                 <span>
//                   <img
//                     //  src="/logo-icon.png"
//                     src={logo}
//                     alt={myBoilerLabel}
//                   />
//                   {/* <img
//                     // src="/logo.png"
//                     src="/l'''ogo.png"
//                     alt={myBoilerLabel}
//                     className="ml-1"
//                   /> */}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//         <div>
//           <Helmet title="Sign In" />
//           <div className="title login-heading header_text">
//             <h1 className="text-uppercase">
//               <strong>WELCOME TO {toUpper(myBoilerLabel)}</strong>
//             </h1>
//             <h4 className="color-white">{loginHeaderText}</h4>
//           </div>
//           <div className="formWrapper">
//             <div className="block">
//               <div className="row">
//                 <div className="col-xl-12">
//                   <div className="inner">
//                     <div className="form">
//                       <div className="login_header">
//                         <h4 className="text-uppercase">
//                           <strong>
//                             Welcome back, please login to your account.
//                           </strong>
//                         </h4>
//                       </div>
//                       <br />
//                       <Form
//                         form={form}
//                         layout="vertical"
//                         onFinish={handleSubmit}
//                         className="login-form"
//                         autoComplete="random-string"
//                       >
//                         <Form.Item
//                           // name="email"
//                           name="email"
//                           label="Email Address"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please input email!",
//                             },
//                             {
//                               // type: "email",
//                               message: "Please enter valid email.",
//                             },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             prefix={<MailOutlined className="form_icons" />}
//                             placeholder="Please enter email"
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="password"
//                           label="Password"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please input password!",
//                             },
//                           ]}
//                         >
//                           <Input.Password
//                             size="large"
//                             prefix={<LockOutlined className="form_icons" />}
//                             type="password"
//                             placeholder="Password"
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           // name="code"
//                           name="recaptchaResponse"
//                         >
//                           <ReCAPTCHA
//                             ref={(el) => {
//                               recaptchaRef = el;
//                             }}
//                             sitekey={recaptchaKey}
//                           />
//                         </Form.Item>

//                         <Form.Item>
//                           <Link
//                             onClick={sound}
//                             to="/forgot"
//                             className="text-primary utils__link--underlined float-right"
//                           >
//                             Forgot password?
//                           </Link>
//                         </Form.Item>
//                         <div className="form-actions">
//                           <Button
//                             onClick={sound}
//                             className="login-form-button btn btn-squared btn-primary datapuppet-button"
//                             htmlType="submit"
//                             loading={loading}
//                           >
//                             Sign in
//                           </Button>
//                           <span className="ml-3 register-link">
//                             if you don&#39;t have account{" "}
//                             <Link
//                               onClick={sound}
//                               to="/register"
//                               className="text-primary utils__link--underlined"
//                             >
//                               Register
//                             </Link>
//                           </span>
//                         </div>
//                       </Form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={"footer text-center"}>
//         <p>
//           &copy; {moment().format("YYYY")} {myBoilerLabel}. All rights
//           reserved.
//         </p>
//       </div>
//     </div>
//   </Layout.Content>
// </Layout>
