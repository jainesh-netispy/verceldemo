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
} from 'antd'
import AvatarEditor from 'react-avatar-editor'
import ImgCrop from 'antd-img-crop'
import { RouteComponentProps } from 'react-router-dom'
import { DispatchProp, connect, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import {
  getCurrentUser,
  updateUser,
  // getPollResult,
  updateUserPass,
  deleteAvatar,
  getPollNotification,
  pollNotificationEdit,
} from '../../redux/actions'
import DashboardHeader from '../../components/header2'
import DashboardTopBar from '../../components/topbar'
import _ from 'lodash'
import PhoneInput from 'react-phone-input-2'
import ModalBodyClass from '../../components/modalBodyClass'
import 'react-phone-input-2/lib/style.css'
import Footerhtml from '../../components/footer'
import { baseUrl, sound } from '../../constants/index'
import { openNotification } from '../../utils/notification'
import firstPollMessage from '../../services/firstPoll'
import { UserOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

const EditProfile: React.FC<LoginProps> = function ({
  dispatch,
  // location,
  history,
}) {
  const counter = useSelector((info: any) => info)
  const [id, setId] = useState<any>(
    counter && counter.user && counter.user.userInfo && counter.user.userInfo._id,
  )
  const [user, setUser] = useState<any>({
    status: 'ACTIVE',
    verified: true,
    firstName: ' Admin ',
    lastName: 'Admin',
    email: 'admin@myboiler.com',
    originalEmail: 'admin@myboiler.com',
    password: '',
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
    phone: '12222222222',
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
  const [token, setToken] = useState<any>(
    counter && counter.user && counter.user.userInfo && counter.user.userInfo.token,
  )
  const [userLoading, setuserLoading] = useState(true)

  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [loading, setLoading] = useState<any>(false)
  // eslint-disable-next-line
  const [avatar, setAvatar] = useState<any>(null)

  const onProfileChange = async (values: any) => {
    try {
      const id = user._id
      setLoading(true)
      dispatch(updateUser(id, values)).then((res: any) => {
        setLoading(false)
        if (res !== undefined) {
          openNotification(res && res.data.message)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  const onChangePassword = async (values: any) => {
    try {
      const id = user._id
      setLoading(true)
      dispatch(updateUserPass(id, values, token)).then((res: any) => {
        setLoading(false)
        if (res) {
          openNotification(res && res.data.message)
          setTimeout(() => {
            localStorage.removeItem('USER')
            // eslint-disable-next-line no-restricted-globals
            location.href = '/login'
          }, 1000)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const [visible, setVisible] = useState<any>(false)
  const showModal = () => {
    sound()
    setVisible(true)
  }

  const handleCancel = () => {
    sound()
    setVisible(false)
  }
  const handleOk = () => {
    sound()
    const formData = new FormData()
    formData.append('avatar', avatar)
    try {
      // await userService.fileUpload(user._id, formData);
      setVisible(false)
    } catch (error) {
      console.error(error)
    }
    // setVisible(false);
  }

  const backgroundEnabled = true
  const [pollList, setPollList] = useState<any>('')
  // eslint-disable-next-line
  // const [id, setId] = useState<any>(counter.user.userInfo.user._id);

  const fileProps = {
    name: 'avatar',
    action: `${baseUrl}/upload/${user._id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      // "Content-Type": "multipart/form-data",
    },
  }

  const [passwordHasEightChars, setPasswordHasEightChars] = useState(false)
  const [passwordHasOneLowerChar, setPasswordHasOneLowerChar] = useState(false)
  const [passwordHasOneUpperChar, setPasswordHasOneUpperChar] = useState(false)
  const [passwordHasOneDigit, setPasswordHasOneDigit] = useState(false)
  const handlePasswordError = e => {
    const value = e.target.value
    const lowerCaseRegex = new RegExp('(?=.*[a-z])')
    const upperCaseRegex = new RegExp('(?=.*[A-Z])')
    const oneDigitRegex = new RegExp('(?=.*[0-9])')
    value.length >= 8 ? setPasswordHasEightChars(true) : setPasswordHasEightChars(false)
    lowerCaseRegex.test(value)
      ? setPasswordHasOneLowerChar(true)
      : setPasswordHasOneLowerChar(false)
    upperCaseRegex.test(value)
      ? setPasswordHasOneUpperChar(true)
      : setPasswordHasOneUpperChar(false)
    oneDigitRegex.test(value) ? setPasswordHasOneDigit(true) : setPasswordHasOneDigit(false)
  }
  const [pollResultLoading, setPollResultLoading] = useState(true)
  const setUserData = userDetailsObj => {
    form1.setFieldsValue({
      firstName: userDetailsObj && userDetailsObj.firstName,
      lastName: userDetailsObj && userDetailsObj.lastName,
      email: userDetailsObj && userDetailsObj.email,
      phone: userDetailsObj && userDetailsObj.phone,
      telegramHandle: userDetailsObj && userDetailsObj.telegramHandle,
      instagramHandle: userDetailsObj && userDetailsObj.instagramHandle,
      facebookHandle: userDetailsObj && userDetailsObj.facebookHandle,
      age: userDetailsObj && userDetailsObj.age,
      sex: userDetailsObj && userDetailsObj.sex,
      technicalAnalysis: userDetailsObj && userDetailsObj.technicalAnalysis,
      crypto: userDetailsObj && userDetailsObj.crypto,
      equities: userDetailsObj && userDetailsObj.equities,
      description: userDetailsObj && userDetailsObj.description,
      tradingOption: userDetailsObj && userDetailsObj.tradingOption,
      netWorthCrypto: userDetailsObj && userDetailsObj.netWorthCrypto,
      forEx: userDetailsObj && userDetailsObj.forEx,
    })
  }

  const [removeAvatarLoading, setRemoveAvatarLoading] = useState(false)

  const handleDeleteProPic = () => {
    try {
      setRemoveAvatarLoading(true)
      dispatch(deleteAvatar(id)).then((res: any) => {
        setRemoveAvatarLoading(false)
        if (res) {
          setVisible(false)
          openNotification(res && res.data.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setEditorRef = editor => {
    // eslint-disable-next-line
    editor = editor
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <DashboardHeader />
        <Layout>
          <DashboardTopBar />
          <Layout.Content
            style={{ height: '100%', position: 'relative', padding: '3rem' }}
            className="layoutHeight"
          >
            <Row justify="center">
              <Col
                span={24}
                style={{
                  borderRadius: '10px',
                }}
              >
                <Row justify="center">
                  <Col span={24}>
                    <Col style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
                      {' '}
                      <Card style={{ borderRadius: '10px' }}>
                        <Row>
                          <Form
                            form={form}
                            name="horizontal_login0"
                            // onFinish={onAvtarUpload}
                            size="large"
                          >
                            <div onClick={showModal}>
                              <Avatar
                                src={
                                  user.avatar ? (
                                    user.avatar
                                  ) : (
                                    <Avatar size={64} icon={<UserOutlined />} />
                                  )
                                }
                                shape="square"
                                size={100}
                                style={{ cursor: 'pointer' }}
                              />
                            </div>

                            <Modal
                              centered
                              bodyStyle={{ padding: '0px' }}
                              title="Change Avatar"
                              visible={visible}
                              onCancel={handleCancel}
                              footer={
                                <div className="d-flex justify-content-between">
                                  <Row>
                                    <Col
                                      span={24}
                                      style={
                                        user.avatar
                                          ? {
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                            }
                                          : {}
                                      }
                                    >
                                      {user.avatar && (
                                        <>
                                          <Button
                                            type="primary"
                                            onClick={handleDeleteProPic}
                                            style={{ width: '150px' }}
                                            loading={removeAvatarLoading}
                                            danger
                                            className="btn btn-primary  "
                                          >
                                            Delete Avatar
                                          </Button>

                                          <Upload
                                            {...fileProps}
                                            method="PUT"
                                            showUploadList={false}
                                          >
                                            <Button
                                              // loading={changeAvatarLoading}
                                              style={{
                                                width: '150px',
                                                backgroundColor: '#6E45C0',
                                              }}
                                              className="btn btn-primary  "
                                            >
                                              Change Avatar
                                            </Button>
                                          </Upload>
                                        </>
                                      )}
                                      <Button
                                        style={{ width: '150px' }}
                                        className="btn btn-primary ml-2 datapuppet-button"
                                        // loading={changeAvatarLoading}
                                        onClick={handleOk}
                                      >
                                        Save Avatar
                                      </Button>
                                    </Col>
                                  </Row>
                                </div>
                              }
                            >
                              {user.avatar ? (
                                <div
                                  style={{
                                    backgroundColor: '#343a40',
                                    textAlign: 'center',
                                    padding: '2em',
                                    textDecoration: 'none',
                                  }}
                                >
                                  <AvatarEditor
                                    image={user.avatar}
                                    ref={setEditorRef}
                                    width={250}
                                    height={250}
                                    border={2}
                                    borderRadius={250}
                                    color={[0, 0, 0, 0.6]} // RGBA
                                    scale={1.2}
                                    rotate={0}
                                  />
                                </div>
                              ) : (
                                <div
                                  style={{
                                    backgroundColor: '#343a40',
                                    padding: '2em',
                                    textDecoration: 'none',
                                  }}
                                >
                                  <Empty
                                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                    imageStyle={{
                                      height: 60,
                                    }}
                                    description={
                                      <span
                                        style={{
                                          color: 'white',
                                          fontSize: '2rem',
                                          lineHeight: '3rem',
                                        }}
                                      >
                                        {[
                                          `You don't hav any avatar yet.`,
                                          <br />,
                                          `Upload your first photo`,
                                        ]}
                                      </span>
                                    }
                                  >
                                    <ImgCrop
                                      modalOk="Save Avtar"
                                      shape="round"
                                      modalCancel=""
                                      zoom={false}
                                    >
                                      <Upload
                                        {...fileProps}
                                        method="PUT"
                                        // action={`http://localhost:3333/api/upload/${user._id}`}
                                        // listType="picture-card"
                                        // fileList={fileList}
                                        // onChange={onChange}
                                        // onPreview={onPreview}  name="avatar"
                                      >
                                        <Button className="datapuppet-button">Upload Photo</Button>
                                      </Upload>
                                    </ImgCrop>
                                  </Empty>
                                </div>
                              )}
                              <ModalBodyClass isModalVisible={visible} />
                            </Modal>
                          </Form>
                          <Col
                            style={{
                              marginLeft: '1em',
                              marginTop: 'auto',
                              marginBottom: 'auto',
                            }}
                          >
                            <Row>
                              <h1
                                style={{
                                  marginBottom: '0px',
                                  textTransform: 'capitalize',
                                }}
                              >
                                {user.firstName} {user.lastName}
                              </h1>
                            </Row>
                            <Row>
                              <span>{user.email}</span>
                            </Row>
                            <span>{user.phone}</span>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Col>
                </Row>
                <Row justify="center" style={{ marginTop: '1em' }}>
                  <Col span={24}>
                    <Row>
                      <Col flex="1 1 700px" style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
                        <Card
                          style={{
                            borderRadius: '10px',
                            minHeight: '50em',
                            marginBottom: '1em',
                          }}
                        >
                          <Row justify="center">
                            <Col span={24}>
                              <Tabs tabPosition="top">
                                <TabPane tab="Change Passowrd" key="1">
                                  <Form
                                    form={form2}
                                    name="horizontal_login1"
                                    onFinish={onChangePassword}
                                    size="large"
                                  >
                                    <Row gutter={[16, 0]}>
                                      <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                        <Form.Item
                                          name="password"
                                          rules={[
                                            {
                                              required: true,
                                              message: 'Please enter your old password!',
                                            },
                                          ]}
                                        >
                                          <Input.Password
                                            type="password"
                                            placeholder="Please enter your old password!"
                                          />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                    <Row gutter={[16, 0]}>
                                      <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                        <Form.Item
                                          name="password1"
                                          rules={[
                                            {
                                              required: true,
                                              message: 'Please enter your password!',
                                            },
                                          ]}
                                        >
                                          <Input.Password
                                            onChange={handlePasswordError}
                                            type="password"
                                            placeholder="Please enter your new password!"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                        <Form.Item
                                          name="newPassword"
                                          dependencies={['password1']}
                                          hasFeedback
                                          rules={[
                                            {
                                              required: true,
                                              message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                              validator(rule, value) {
                                                if (
                                                  !value ||
                                                  getFieldValue('password1') === value
                                                ) {
                                                  return Promise.resolve()
                                                }
                                                return Promise.reject(
                                                  'The two passwords that you entered do not match!',
                                                )
                                              },
                                            }),
                                          ]}
                                        >
                                          <Input.Password
                                            type="password"
                                            placeholder="Please enter your confirm password!"
                                          />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                    <Row gutter={[16, 0]}>
                                      <Col xs={{ span: 12 }} sm={{ span: 24 }}>
                                        <p style={{ marginBottom: '0' }}>
                                          Password should be at least:
                                        </p>
                                        <ul style={{ listStyle: 'none' }}>
                                          <li>
                                            <Badge
                                              status={passwordHasEightChars ? 'success' : 'error'}
                                            />
                                            At Least 8 Characters in Length
                                          </li>
                                          <li>
                                            <Badge
                                              status={passwordHasOneLowerChar ? 'success' : 'error'}
                                            />
                                            Minimum One Lowercase Character
                                          </li>
                                          <li>
                                            <Badge
                                              status={passwordHasOneUpperChar ? 'success' : 'error'}
                                            />
                                            Minimum One Uppercase Character
                                          </li>
                                          <li>
                                            <Badge
                                              status={passwordHasOneDigit ? 'success' : 'error'}
                                            />
                                            Minimum One Number
                                          </li>
                                        </ul>
                                      </Col>
                                    </Row>
                                    <Divider dashed />
                                    <Row style={{ float: 'right' }}>
                                      <Col xs={{ span: 12 }} sm={{ span: 24 }}>
                                        <Form.Item style={{ marginBottom: '0px' }}>
                                          <Button
                                            onClick={sound}
                                            type="primary"
                                            loading={loading}
                                            htmlType="submit"
                                            style={{
                                              backgroundColor: '#e48c32',
                                              border: 'none',
                                            }}
                                          >
                                            Update
                                          </Button>
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </Form>
                                </TabPane>
                              </Tabs>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Layout.Content>
          <Footerhtml />
        </Layout>
      </Layout>
    </>
  )
}

export default connect()(EditProfile)
