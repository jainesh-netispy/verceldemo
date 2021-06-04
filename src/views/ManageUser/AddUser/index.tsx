import React, { useState, useEffect } from 'react'
import {
  Button,
  Input,
  Form,
  Layout,
  Row,
  Col,
  Card,
  Avatar,
  Radio,
  Divider,
  Badge,
  Tabs,
  Modal,
  List,
  Upload,
  Empty,
  Alert,
  Switch,
  Spin,
  Select,
  DatePicker,
} from 'antd'
import AvatarEditor from 'react-avatar-editor'
import ImgCrop from 'antd-img-crop'
import { RouteComponentProps } from 'react-router-dom'
import { DispatchProp, connect, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import {
  getCurrentUser,
  addUser,
  // getPollResult,
  // addUserPass,
  deleteAvatar,
  getPollNotification,
  pollNotificationEdit,
} from '../../../redux/actions'
import DashboardHeader from '../../../components/header2'
import _ from 'lodash'
import PhoneInput from 'react-phone-input-2'
import ModalBodyClass from '../../../components/modalBodyClass'
import 'react-phone-input-2/lib/style.css'
import Footerhtml from '../../../components/footer'
import { baseUrl, sound } from '../../../constants/index'
import { openNotification } from '../../../utils/notification'
import firstPollMessage from '../../../services/firstPoll'
import { UserOutlined } from '@ant-design/icons'
const { TextArea } = Input
const { TabPane } = Tabs
type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

const AddUser: React.FC<LoginProps> = function ({
  dispatch,
  // location,
  history,
}) {
  const counter = useSelector((info: any) => info)
  const [user, setUser] = useState<any>({
    status: 'ACTIVE',
    verified: true,
    firstName: ' Admin ',
    lastName: 'Admin',
    email: 'admin@myboiler.com',
    originalEmail: 'admin@myboiler.com',
    password: 'd352759113c6300c95eff324a87f954c',
    ipAddress: '::1',
    createdAt: {
      $date: '2020-10-16T11:48:26.447Z',
    },
    updatedAt: {
      $date: '2020-12-30T13:31:52.365Z',
    },
    __v: 0,
    role: 'A',
    avatar: 'avatar-1609335112304.jpg',
    age: 223,
    mobileNo: '12222222222',
    facebookHandle: 'facebook111',
    instagramHandle: 'instagram11',
    telegramHandle: 'telegram11',
    forEx: '0-5',
    sex: 'm',
    crypto: '5-10',
    equities: '5-10',
    netWorthCrypto: '25-50%',
    technicalAnalysis: '15+',
    tradingOption: '5-10',
    firstPollSubmit: true,
  })
  // eslint-disable-next-line
  const [userLoading, setuserLoading] = useState(true)
  const getUserDetails = () => {
    try {
      // const id = user._id;
      setuserLoading(true)
      dispatch(getCurrentUser(id)).then((res: any) => {
        if (res) {
          setuserLoading(false)
          setUser(res && res.data ? res.data.data : '')
          form1.setFieldsValue({
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            email: res.data.data.email,
            mobileNo: res.data.data.mobileNo,
            companyName: res.data.data.companyName,
            gasSafeNo: res.data.data.gasSafeNo,
          })
          // setUserData(res && res.data && res.data.data);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserDetails()
    // eslint-disable-next-line
  }, [])

  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [loading, setLoading] = useState<any>(false)

  const onUserAdd = async (values: any) => {
    try {
      setLoading(true)
      // const values = await form.validateFields();
      const data = id ? { ...values, userId: id } : values
      dispatch(addUser(data, id ? 'Edit' : 'Add')).then((res: any) => {
        setLoading(false)
        if (res !== undefined) {
          form.resetFields()
          history.push('/manage/users')
          // getBoilerList();
        }
      })
    } catch (err) {
      console.log(err)
    }
    // try {
    //   const id = user._id;
    //   setLoading(true);
    //   dispatch(addUser(id, values)).then((res: any) => {
    //     setLoading(false);
    //     getUserDetails();
    //     if (res !== undefined) {
    //       openNotification(res && res.data.message);
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const { Option } = Select

  // const setUserData = (userDetailsObj) => {
  //   form1.setFieldsValue({
  //     firstName: userDetailsObj && userDetailsObj.firstName,
  //     lastName: userDetailsObj && userDetailsObj.lastName,
  //     email: userDetailsObj && userDetailsObj.email,
  //     phone: userDetailsObj && userDetailsObj.phone,
  //     companyName: userDetailsObj && userDetailsObj.companyName,
  //     gasSafeNo: userDetailsObj && userDetailsObj.gasSafeNo,
  //   });
  // };
  const id = location.pathname.split('/')[3]

  const backgroundEnabled = true
  return (
    <>
      <Layout className="layoutHeight">
        <DashboardHeader />
        <div className={backgroundEnabled ? 'layout light' : `layout`}>
          {/* <div className="content"> */}
          <Row justify="center" style={{ marginTop: '1em' }}>
            <Col span={20}>
              <Card
                style={{
                  borderRadius: '10px',
                  minHeight: '40em',
                  marginBottom: '1em',
                }}
              >
                <Row justify="center">
                  <Col span={24}>
                    <h1>{id ? 'Edit' : 'Add'} User details</h1>
                    <Divider />
                    {!userLoading ? (
                      <>
                        {/* {true ? ( */}
                        <Form
                          layout="vertical"
                          form={form1}
                          name="horizontal_login"
                          onFinish={onUserAdd}
                          size="large"
                        >
                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[
                                  {
                                    message: 'Please enter your firstname!',
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[
                                  {
                                    message: 'Please enter your lastname!',
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="companyName"
                                label="Company Name"
                                rules={[
                                  {
                                    message: 'Please enter your firstname!',
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="gasSafeNo"
                                label="Gas Safe No"
                                rules={[
                                  {
                                    message: 'Please enter your lastname!',
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                  {
                                    type: 'email',
                                    message: 'The enter is not valid E-mail!',
                                  },
                                  {
                                    message: 'Please enter your E-mail!',
                                  },
                                ]}
                              >
                                <Input
                                // disabled
                                // defaultValue={user.email}
                                />
                              </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="mobileNo"
                                label="Phone Number"
                                rules={[
                                  {
                                    message: 'Please enter your phone number!',
                                  },
                                ]}
                              >
                                <PhoneInput
                                  // value={user.mobileNo}
                                  inputStyle={{
                                    height: '40px',
                                    width: 'inherit',
                                    borderRadius: '0px',
                                  }}
                                  country={'us'}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Divider dashed />
                          <Row gutter={[16, 0]} style={{ float: 'right' }}>
                            <Col xs={{ span: 12 }} sm={{ span: 24 }}>
                              <Form.Item>
                                <Button
                                  onClick={sound}
                                  type="primary"
                                  htmlType="submit"
                                  loading={loading}
                                  style={{
                                    backgroundColor: '#e48c32',
                                    border: 'none',
                                  }}
                                >
                                  Save
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </>
                    ) : (
                      <Col
                        style={{
                          textAlign: 'center',
                          marginTop: '4em',
                        }}
                      >
                        <Spin size="large" />
                      </Col>
                    )}{' '}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {/* </div> */}
        </div>
      </Layout>
      <Footerhtml />
    </>
  )
}

export default connect()(AddUser)
