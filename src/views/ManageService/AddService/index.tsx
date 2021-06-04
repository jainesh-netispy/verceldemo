import React, { useState, useEffect } from 'react'
import {
  Button,
  Input,
  Form,
  Layout,
  Row,
  Col,
  Card,
  Radio,
  Divider,
  Tabs,
  Checkbox,
  Spin,
  Select,
  DatePicker,
} from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { DispatchProp, connect, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import {
  addService,
  getServiceById,
  getPostcodeByBoilerId,
  getEngineers,
} from '../../../redux/actions'
import { LOCAL_STORAGE } from '../../../constants'
import DashboardHeader from '../../../components/header2'
import DashboardTopBar from '../../../components/topbar'
import _ from 'lodash'
import 'react-phone-input-2/lib/style.css'
import Footerhtml from '../../../components/footer'
import { openNotification } from '../../../utils/notification'
import SignaturePad from 'react-signature-canvas'
import moment from 'moment'
import { useRouter } from 'next/router'

const { TextArea } = Input
const { TabPane } = Tabs
type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

const AddService: React.FC<LoginProps> = function ({ dispatch, history }) {
  let sigPad: any = {}
  const router = useRouter()

  const counter = useSelector((info: any) => info)
  const [form] = Form.useForm()
  const [lockedVal, setLockedVal] = useState<any>(false)
  const [inhibitorCheckedVal, setInhibitorCheckedVal] = useState<any>(false)
  const type = (typeof window !== "undefined") ? window.location.pathname.split('/')[1] : '';
  const id = (typeof window !== "undefined") ? window.location.pathname.split('/')[3] : '';
  const [engineers, setEngineers] = useState<any>('')
  const [readonlyFields, setReadonlyFields] = useState<any>(false)
  let boilerId = ''
  const userInfo = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any) : [];
  const [user, setUser] = useState<any>({
    status: 'ACTIVE',
    verified: true,
    firstName: ' Admin ',
    lastName: 'Admin',
    email: '',
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

  const getUserDetails = () => {
    try {
      if (type === 'edit' && id) {
        dispatch(getServiceById(id)).then((res: any) => {
          if (res) {
            boilerId =
              res.data.data &&
              res.data.data.boilerInstallationId &&
              res.data.data.boilerInstallationId._id
                ? res.data.data.boilerInstallationId._id
                : ''
            if (res.data.data.locked) {
              setLockedVal(res.data.data.locked)
            }

            if (res.data.data.inhibitorChecked) {
              setInhibitorCheckedVal(res.data.data.inhibitorChecked)
            }

            var a = moment()
            var b = moment(res.data.data.createdAt)

            const timeDifference = a.diff(b, 'hours')
            if (
              (userInfo.type === 'user' && timeDifference > 24) ||
              (res.data.data.locked === true && userInfo.type === 'user')
            ) {
              setReadonlyFields(true)
            }

            form1.setFieldsValue({
              postCode:
                res.data && res.data.data && res.data.data.postCode ? res.data.data.postCode : '',
              uniqueNumber:
                res.data && res.data.data && res.data.data.boilerInstallationId
                  ? res.data.data.boilerInstallationId.boilerSerialNumber
                  : '',
              engineerName:
                res.data && res.data.data && res.data.data.engineerName
                  ? res.data.data.engineerName
                  : '',
              gasRate:
                res.data && res.data.data && res.data.data.gasRate ? res.data.data.gasRate : '',
              boilerPressure:
                res.data && res.data.data && res.data.data.boilerPressure
                  ? res.data.data.boilerPressure
                  : '',
              date:
                res.data && res.data.data && res.data.data.date ? moment(res.data.data.date) : '',
              gasSafeRegistration:
                res.data && res.data.data && res.data.data.gasSafeRegistration
                  ? res.data.data.gasSafeRegistration
                  : '',
              companyName:
                res.data && res.data.data && res.data.data.companyName
                  ? res.data.data.companyName
                  : '',
              minco:
                res.data && res.data.data && res.data.data.minRate ? res.data.data.minRate.co : '',
              minco2:
                res.data && res.data.data && res.data.data.minRate ? res.data.data.minRate.co2 : '',
              mincoOrCo2:
                res.data && res.data.data && res.data.data.minRate
                  ? res.data.data.minRate.coOrCo2
                  : '',
              maxco:
                res.data && res.data.data && res.data.data.maxRate ? res.data.data.maxRate.co : '',
              maxco2:
                res.data && res.data.data && res.data.data.maxRate ? res.data.data.maxRate.co2 : '',
              maxCoOrCo2:
                res.data && res.data.data && res.data.data.maxRate
                  ? res.data.data.maxRate.coOrCo2
                  : '',
              flueIntegrityChecked:
                res.data && res.data.data && res.data.data.flueIntegrityChecked
                  ? res.data.data.flueIntegrityChecked
                  : '',
              werePartsFitted:
                res.data && res.data.data && res.data.data.werePartsFitted
                  ? res.data.data.werePartsFitted
                  : '',
              serviceType:
                res.data && res.data.data && res.data.data.serviceType
                  ? res.data.data.serviceType
                  : '',
              licenseNo:
                res.data && res.data.data && res.data.data.licenseNo ? res.data.data.licenseNo : '',
              comments:
                res.data && res.data.data && res.data.data.comments ? res.data.data.comments : '',
              werePartsFittedNote:
                res.data && res.data.data && res.data.data.werePartsFittedNote
                  ? res.data.data.werePartsFittedNote
                  : '',
              inhibitorChecked:
                res.data && res.data.data && res.data.data.inhibitorChecked
                  ? res.data.data.inhibitorChecked
                  : '',
              locked: res.data && res.data.data && res.data.data.locked ? res.data.data.locked : '',
            })
          }
        })
      } else if (id) {
        dispatch(getPostcodeByBoilerId(id)).then((res: any) => {
          if (res) {
            form1.setFieldsValue({
              postCode: res.data && res.data.data && res.data.data ? res.data.data : '',
              date: moment(),
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserDetails()
    getEngineersList()
    // eslint-disable-next-line
  }, [])

  const getEngineersList = async () => {
    try {
      dispatch(getEngineers()).then((res: any) => {
        if (res !== undefined) {
          if (res.data.data.list) {
            console.log('res.data.data.list', res.data.data.list)
            setEngineers(res.data.data.list)
          }
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const [form1] = Form.useForm()
  const [loading, setLoading] = useState<any>(false)
  // eslint-disable-next-line

  const onServiceAdd = async (values: any) => {
    try {
      setLoading(true)
      /* const formData = new FormData();

       formData.append("signature", formDataUrl);
      _.forEach(values, function (value, key) {
        if (value) {
          formData.append(key, value);
        }
      });
      if (id) {
        if (type === "add") {
          formData.append("serialNumber", id);
        } else {
          formData.append("boilerServiceId", id);
        }
      } */

      /* values.signature = formDataUrl; */

      values.inhibitorChecked = inhibitorCheckedVal

      if (id) {
        if (type === 'add') {
          values.serialNumber = id
        } else {
          values.boilerServiceId = id
        }
      }

      dispatch(addService(values, id ? 'Edit' : 'Add')).then((res: any) => {
        setLoading(false)
        getUserDetails()
        if (res !== undefined) {
          openNotification(res && res.data.message)
        }
        router.push(`/boiler/service/details/${res.data.data.boilerId}`)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const { Option } = Select
  const [showFittedPart, setShowFittedPart] = useState(false)
  const handleChange = (e: any, sessionName) => {
    if (sessionName === 'werePartsFitted') {
      e.target.value == 'Y' ? setShowFittedPart(true) : setShowFittedPart(false)
    }
  }

  function onDateChange(date, dateString) {
    console.log(date, dateString)
  }

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
  const [trimmedDataURL, setTrimmedDataURL] = useState<any>('')
  const [formDataUrl, setFormDataUrl] = useState<any>('')

  const onReset = () => {
    form1.resetFields()
  }

  const onInhibitorChange = e => {
    setInhibitorCheckedVal(e.target.checked)
  }

  const onLockedChange = e => {
    setLockedVal(e.target.checked)
  }

  const clear = () => {
    sigPad.clear()
  }
  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'))
    setFormDataUrl(sigPad.toDataURL('image/png'))
  }

  const redirectList = () => {
    const backBoilerId = window.localStorage.getItem('backBoilerId')
    const temp = backBoilerId ? `/boiler/service/details/${backBoilerId}` : '/manage/service'
    router.push(temp)
  }

  function handleChangeBoilerMake(value) {
    console.log('value', value)

    const temp = _.find(engineers, { _id: value })
    console.log(temp)

    if (temp) {
      form1.setFieldsValue({
        companyName: temp.companyName ? temp.companyName : '',
        gasSafeRegistration: temp.gasSafeNo || '',
        licenseNo: temp.licenseNo || '',
      })
    }
  }

  const backgroundEnabled = true

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
                <Card
                  style={{
                    borderRadius: '10px',
                    minHeight: '50em',
                    marginBottom: '1em',
                  }}
                >
                  <Row justify="center">
                    <Col span={24}>
                      <h1>
                        <span className="pull-left">
                          {id && type === 'edit' ? 'Edit' : 'Add'} Boiler Service Details
                        </span>
                        <span className="pull-right">
                          <a href="Javascript:void(0)" onClick={redirectList}>
                            Back to list
                          </a>
                        </span>
                      </h1>
                      <Divider />
                      {/* {!userLoading ? ( */}
                      {true ? (
                        <Form
                          layout="vertical"
                          form={form1}
                          name="horizontal_login"
                          onFinish={onServiceAdd}
                          size="large"
                        >
                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="postCode"
                                label="Postcode"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter Postcode!',
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item label="Serial No" name="uniqueNumber">
                                <Input defaultValue={type !== 'edit' ? id : ''} disabled />
                              </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="date"
                                label="Date"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select date',
                                  },
                                ]}
                              >
                                <DatePicker
                                  onChange={onDateChange}
                                  style={{ width: '100%' }}
                                  disabled={readonlyFields}
                                  format="DD-MM-YYYY"
                                />
                              </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                label="Service Type"
                                name="serviceType"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select service type',
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Please select any option"
                                  // style={{ width: 120 }}
                                  onChange={e => handleChange(e, 'serviceType')}
                                >
                                  <Option value="Annual service">Annual service</Option>
                                  <Option value="Interim Service/repair">
                                    Interim Service/repair
                                  </Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            {userInfo && userInfo.type !== 'user' && (
                              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <Form.Item
                                  name="engineerName"
                                  label="Engineer Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter Engineer Name!',
                                    },
                                  ]}
                                >
                                  {engineers && (
                                    <Select
                                      showSearch
                                      placeholder="Please select any option"
                                      // style={{ width: 120 }}
                                      onChange={handleChangeBoilerMake}
                                      filterOption={(input, option: any) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      disabled={readonlyFields}
                                    >
                                      {engineers &&
                                        engineers.map((val: any) => (
                                          <Option value={val._id}>{val.email}</Option>
                                        ))}
                                    </Select>
                                  )}
                                </Form.Item>
                              </Col>
                            )}
                            {userInfo && userInfo.type !== 'user' && (
                              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <Form.Item
                                  name="companyName"
                                  label="Company Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter your Company Name!',
                                    },
                                  ]}
                                >
                                  <Input disabled={readonlyFields} />
                                </Form.Item>
                              </Col>
                            )}
                            {userInfo && userInfo.type !== 'user' && (
                              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <Form.Item
                                  name="gasSafeRegistration"
                                  label="Gas Safe Registration"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter Gas Safe Registration!',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                            )}
                            {userInfo && userInfo.type !== 'user' && (
                              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <Form.Item name="licenseNo" label="License No (Optional)">
                                  <Input disabled={readonlyFields} />
                                </Form.Item>
                              </Col>
                            )}
                          </Row>

                          <Row gutter={[16, 10]}>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Card title="Max Rate" bodyStyle={{ padding: '15px' }}>
                                <Row gutter={[16, 0]} style={{ paddingTop: '0px' }}>
                                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Form.Item
                                      name="maxco"
                                      label=" CO "
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please enter  CO PPM!',
                                        },
                                      ]}
                                    >
                                      <Input addonAfter="PPM" disabled={readonlyFields} />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Form.Item
                                      name="maxco2"
                                      label="CO2"
                                      rules={[
                                        {
                                          message: 'Please enter CO2%!',
                                        },
                                      ]}
                                    >
                                      <Input addonAfter="%" disabled={readonlyFields} />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Form.Item
                                      name="maxCoOrCo2"
                                      label="CO/CO2 "
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please enter CO/CO2 RATIO!',
                                        },
                                      ]}
                                    >
                                      <Input addonAfter="RATIO" disabled={readonlyFields} />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Card title="Min Rate" bodyStyle={{ padding: '15px' }}>
                                <Row gutter={[16, 0]} style={{ paddingTop: '0px' }}>
                                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Form.Item
                                      name="minco"
                                      label=" CO "
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please enter  CO PPM!',
                                        },
                                      ]}
                                    >
                                      <Input addonAfter="PPM" disabled={readonlyFields} />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Form.Item
                                      name="minco2"
                                      label="CO2"
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please enter CO2%!',
                                        },
                                      ]}
                                    >
                                      <Input addonAfter="%" disabled={readonlyFields} />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Form.Item
                                      name="mincoOrCo2"
                                      label="CO/CO2 "
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please enter CO/CO2 RATIO!',
                                        },
                                      ]}
                                    >
                                      <Input addonAfter="RATIO" disabled={readonlyFields} />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>{' '}
                          </Row>

                          <Row gutter={[16, 0]} className="mt-3">
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="gasRate"
                                label="Gas Rate (m3/h  or f3/h)"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter Gas Rate (m3/h  or f3/h)!',
                                  },
                                ]}
                              >
                                <Input disabled={readonlyFields} />
                              </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                              <Form.Item
                                name="boilerPressure"
                                label="Boiler Pressure (BAR)"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter Parts Fitted!',
                                  },
                                ]}
                              >
                                <Input disabled={readonlyFields} />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 24 }} md={{ span: 6 }}>
                              <Form.Item
                                label="Flue Integrity checked "
                                name="flueIntegrityChecked"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select flue integrity checked!',
                                  },
                                ]}
                              >
                                <Radio.Group disabled={readonlyFields}>
                                  <Radio value="Y">Yes</Radio>
                                  <Radio value="N">No</Radio>
                                  <Radio value="NA">NA</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 6 }}>
                              <Form.Item
                                label="Were parts fitted"
                                name="werePartsFitted"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select parts fitted!',
                                  },
                                ]}
                              >
                                <Radio.Group
                                  onChange={e => handleChange(e, 'werePartsFitted')}
                                  disabled={readonlyFields}
                                >
                                  <Radio value="Y">Yes</Radio>
                                  <Radio value="N">No</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </Col>

                            <Col xs={{ span: 12 }} md={{ span: 6 }}>
                              <Form.Item name="inhibitorChecked">
                                <Checkbox
                                  style={{ lineHeight: '32px' }}
                                  checked={inhibitorCheckedVal}
                                  onChange={onInhibitorChange}
                                  disabled={readonlyFields}
                                >
                                  Inhibitor Checked
                                </Checkbox>
                              </Form.Item>
                            </Col>

                            {userInfo.type === 'admin' && (
                              <Col xs={{ span: 12 }} md={{ span: 6 }}>
                                <Form.Item name="locked">
                                  <Checkbox
                                    style={{ lineHeight: '32px' }}
                                    checked={lockedVal}
                                    onChange={onLockedChange}
                                  >
                                    Locked
                                  </Checkbox>
                                </Form.Item>
                              </Col>
                            )}
                          </Row>

                          {showFittedPart ? (
                            <Row gutter={[16, 0]}>
                              <Col xs={{ span: 24 }} md={{ span: 24 }}>
                                <Form.Item name="werePartsFittedNote" label="Enter parts fitted">
                                  <TextArea rows={4} disabled={readonlyFields} />
                                </Form.Item>
                              </Col>
                            </Row>
                          ) : null}

                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 24 }} md={{ span: 24 }}>
                              <Form.Item name="comments" label="Comments">
                                <TextArea rows={4} disabled={readonlyFields} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 24 }} md={{ span: 24 }}>
                              <Form.Item
                                name="signature"
                                label="Signature"
                                rules={[
                                  {
                                    message: 'Please enter Signature!',
                                  },
                                ]}
                              >
                                <Col>
                                  <SignaturePad
                                    canvasProps={{
                                      style: {
                                        border: '1px solid black',
                                        height: '200px',
                                        width: '100%',
                                      },
                                    }}
                                    ref={(ref: any) => {
                                      sigPad = ref
                                    }}
                                  />
                                </Col>
                                <Col>
                                  <Row>
                                    <Col xs={12} sm={4} md={1}>
                                      <Button onClick={clear}>Clear</Button>
                                    </Col>
                                    <Col xs={12} sm={4} md={1}>
                                      <Button onClick={trim} className="ml-3">
                                        Save
                                      </Button>
                                    </Col>
                                  </Row>
                                </Col>
                              </Form.Item>
                            </Col>
                          </Row>

                          <Divider dashed />
                          <Row gutter={[16, 0]}>
                            <Col xs={{ span: 12 }} sm={{ span: 24 }}>
                              <Form.Item>
                                {type !== 'edit' && (
                                  <Button
                                    className="btn btn-squared mr-1"
                                    htmlType="button"
                                    onClick={onReset}
                                    disabled={readonlyFields}
                                  >
                                    Reset
                                  </Button>
                                )}
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  loading={loading}
                                  style={{
                                    backgroundColor: '#e48c32',
                                    border: 'none',
                                  }}
                                  disabled={readonlyFields}
                                >
                                  Save
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
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
          </Layout.Content>
          <Footerhtml />
        </Layout>
      </Layout>
    </>
  )
}

export default connect()(AddService)
