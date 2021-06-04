import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Input,
  Form,
  Layout,
  Row,
  Col,
  Card,
  Divider,
  Tabs,
  Spin,
  Select,
  DatePicker,
  Tooltip,
  Switch,
  Popconfirm,
  notification,
} from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { DispatchProp, connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { getOptions, addBoiler, getBoilerById, getEngineers } from '../../../redux/actions'
import { AnyAction } from 'redux'
import DashboardHeader from '../../../components/header2'
import DashboardTopBar from '../../../components/topbar'
import _ from 'lodash'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Footerhtml from '../../../components/footer'
import { Link } from 'react-router-dom'
import Table from '../../../components/table'
import { addService, getService, deleteService, getBoilerModels } from '../../../redux/actions'
import moment from 'moment'
import CreateContent from '../../ManageService/components/modal'
import { useRouter } from 'next/router'
import { LOCAL_STORAGE } from 'src/constants'

const { TextArea } = Input
const { TabPane } = Tabs
type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

const AddBoiler: React.FC<LoginProps> = function ({ dispatch, location, history }) {
  const router = useRouter()
  const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
  const id = router.pathname.split('/')[4]
  const selectedTabType = router.pathname.split('/')[2]
  const [form] = Form.useForm()
  const { Option } = Select
  const tableRef = useRef<any>()
  const [currentActiveId, setCurrentActiveId] = useState('')
  const [currentDeleteActiveId, setCurrentDeleteActiveId] = useState('')
  const [visibleDetails, setVisibleDetails] = useState(false)
  const [details, setDetails] = useState<any>('')
  const [boilerSerialNo, setBoilerSerialNo] = useState('')
  const deaultTabActiveKey = selectedTabType === 'service' ? '2' : '1'
  const [boilerModels, setBoilerModels] = useState<any>('')
  const [engineers, setEngineers] = useState<any>('')
  const [selectedEngineers, setSelectedEngineers] = useState<any>('')

  const [disabledFlag, setDisabledFlag] = useState(false)

  if (id) {
    window.localStorage.setItem('backBoilerId', id)
  }

  const columns = [
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      sorter: {
        multiple: 2,
      },
      // ellipsis: {
      //   showTitle: false,
      // },
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: {
        multiple: 3,
      },
      // ellipsis: {
      //   showTitle: false,
      // },
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {moment(name).format('DD MMM YYYY HH:mm:ss')}
        </Tooltip>
      ),
    },
    {
      title: 'Engineer Name',
      dataIndex: 'engineerName',
      sorter: {
        multiple: 4,
      },
      // ellipsis: {
      //   showTitle: false,
      // },
      render: (name, row) => (
        <span>
          {name.firstName} {name.lastName}
        </span>
      ),
      /*   ...getColumnSearchProps("phone"), */
    },

    {
      title: 'Company Name',
      dataIndex: 'companyName',
      sorter: {
        multiple: 5,
      },
      // ellipsis: {
      //   showTitle: false,
      // },
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
      /*   ...getColumnSearchProps("phone"), */
    },
    {
      title: 'Status',
      dataIndex: 'status',
      // key: "status",
      width: '100px',
      filters: [
        {
          text: 'Active',
          value: 'active',
        },
        {
          text: 'Inactive',
          value: 'deactive',
        },
      ],
      filterMultiple: false,
      ellipsis: {
        showTitle: false,
      },
      render: (data, row) => (
        <div>
          {row.createByMe && (
            <Switch
              defaultChecked={row.status === 'active' || false}
              onChange={checked => statusChanged(checked, row)}
              loading={currentActiveId === row._id || false}
            />
          )}
          {!row.createByMe && <span>{data === 'active' ? 'Enabled' : 'Disabled'}</span>}
        </div>
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, row) => (
        <Row>
          {' '}
          <Col span={24}>
            {row.createByMe && (
              <Button
                type="primary"
                style={{
                  // width: "100px",
                  marginBottom: '10px',
                  marginRight: '10px',
                }}
                onClick={() => history.push(`/edit/service/${row._id}`)}
                // className="datapuppet-button"
                // style={{ marginLeft: "10px" }}
              >
                Edit
              </Button>
            )}
            <Button
              style={{
                // width: "90px",
                marginBottom: '10px',
                marginRight: '10px',
              }}
              onClick={() => (setVisibleDetails(true), setDetails(row))}
              // style={{ backgroundColor: "#6610F2", border: "none" }}
              // className="ml-1"
            >
              Details
            </Button>
            {row.createByMe && (
              <Popconfirm
                title="Are you sure to delete?"
                okText="Yes"
                cancelText="No"
                onConfirm={e => handleActionButton(e, row._id)}
                placement="bottomLeft"
              >
                <Button danger loading={currentDeleteActiveId === row._id || false}>
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Col>{' '}
          <CreateContent
            visible={visibleDetails}
            // onSuccess={(res) => (
            //   openNotification(res && res.data && res.data.message),
            //   setVisibleAddBrand(false),
            // )}
            onCancel={
              () => setVisibleDetails(false)
              // setBrandDetails("")
            }
            rowData={details}
            // editBrand={visibleEditBrand}
          />
        </Row>
      ),
    },
  ]

  const statusChanged = (checked: boolean, row: any) => {
    const serviceId = row._id
    const status = checked ? 'active' : 'deactive'
    const payload = { serviceId, status }
    setCurrentActiveId(serviceId)
    dispatch(addService(payload, 'edit')).then(res => {
      if (res.data) {
        // openNotification(res && res.data && res.data.message);
        setCurrentActiveId('')
        getCMSTableData('')
        tableRef.current.getTableData()
      }
    })
  }
  function getCMSTableData(params: any) {
    if (id) {
      params.boilerInstallationId = id
    }

    return dispatch(getService(params)).then(res => {
      res.data.data.list.map((item: any) => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm')
        return item
      })
      return res
    })
  }

  function handleActionButton(e, serviceId) {
    if (!serviceId) {
      notification.error({
        message: `Error`,
        description: 'Invalid Access',
      })
      return false
    }
    setCurrentDeleteActiveId(serviceId)
    dispatch(deleteService(serviceId)).then(res => {
      setCurrentDeleteActiveId('')
      if (res) {
        tableRef.current.getTableData()
        // getCMSTableData("");
      }
    })
  }
  function initParams() {
    tableRef?.current?.getTableData()
  }
  useEffect(() => {
    initParams()
  }, [])

  function onDateChange(date, dateString) {
    console.log(date, dateString)
  }
  const [options, setOptions] = useState<any>([])
  useEffect(() => {
    getOption()
    getEngineersList()
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
  const getOption = async () => {
    try {
      dispatch(getOptions()).then((res: any) => {
        if (res) {
          console.log('res: ', res)
          setOptions(res.data.data)
          form.setFieldsValue({
            gasSafeNumber:
              res.data && res.data.data[0] && res.data.data[0].userDetails
                ? res.data.data[0].userDetails.gasSafeNo
                : '',
            telephoneNo:
              res.data && res.data.data[0]
                ? res.data.data[0] &&
                  res.data.data[0].userDetails &&
                  res.data.data[0].userDetails.mobileNo
                : '',
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (id) {
      getBoilers(id)
    } else {
      form.setFieldsValue({
        commissioningOrinstallDate: moment(),
      })
    }
  }, [id])
  const getBoilers = async (id: any) => {
    try {
      // const values = await form.validateFields();
      dispatch(getBoilerById(id)).then((res: any) => {
        if (res !== undefined) {
          handleChangeBoilerMake(res.data.data.boilerMake)

          if (res.data.data.boilerSerialNumber) {
            setBoilerSerialNo(res.data.data.boilerSerialNumber)
          }

          if (res.data.data.disableFlag) {
            setDisabledFlag(true)
          }

          form.setFieldsValue({
            postCode: res.data.data.postCode,
            boilerMake: res.data.data.boilerMake,
            boilerModel: res.data.data.boilerModel,
            boilerPressure: res.data.data.boilerPressure,
            boilerSerialNumber: res.data.data.boilerSerialNumber,
            boilerType: res.data.data.boilerType,
            comments: res.data.data.comments,
            commissionedBy: res.data.data.commissionedBy,
            commissioningOrinstallDate: moment(res.data.data.commissioningOrinstallDate),
            // // createdAt:res.data.data.postCode,
            flowTemp: res.data.data.flowTemp,
            fuelType: res.data.data.fuelType,
            gasSafeNumber: res.data.data.gasSafeNumber,
            kWRatedTo: res.data.data.kWRatedTo,
            telephoneNo: res.data.data.telephoneNo,
          })
          // getBoilerList();
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleSubmit = async (values: any) => {
    try {
      const values = await form.validateFields()

      if (selectedEngineers) {
        values.engineers = selectedEngineers
      }

      const data = id ? { ...values, boilerId: id } : values
      dispatch(addBoiler(data, id ? 'Edit' : 'Add')).then((res: any) => {
        if (res !== undefined) {
          form.resetFields()
          router.push('/manage/boiler')
          // getBoilerList();
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  function handleChangeBoilerMake(value) {
    dispatch(getBoilerModels(value)).then((res: any) => {
      if (res !== undefined) {
        setBoilerModels(res.data.data)
      }
    })
  }

  function handleEngineersSelection(value) {
    setSelectedEngineers(value)
  }

  const onReset = () => {
    form.resetFields()
  }

  function callback(key) {
    if (key === '2') {
      setTimeout(function () {
        const params = { id }

        tableRef.current.getTableData(params)
      }, 1000)
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
                <Tabs defaultActiveKey={deaultTabActiveKey} onChange={callback}>
                  <TabPane tab={`${id ? 'Edit' : 'Add'} Boiler details`} key="1">
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
                            <span className="pull-left">{id ? 'Edit' : 'Add'} Boiler details</span>
                            {/* {id && (
                              <span className="pull-right">
                                <Link to={`/add/service`}>
                                  Add Service Record
                                </Link>
                              </span>
                            )} */}
                          </h1>
                          <Divider />
                          {/* {!userLoading ? ( */}
                          {true ? (
                            <Form
                              form={form}
                              layout="vertical"
                              onFinish={handleSubmit}
                              name="horizontal_login"
                              // autoComplete="random-string"
                              size="large"
                            >
                              <Row gutter={[16, 0]}>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    // name="email"
                                    name="postCode"
                                    label="Postcode"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please input Postcode!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Please enter Postcode"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>{' '}
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    // name="email"
                                    name="boilerSerialNumber"
                                    label="Boiler Serial No"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please input Boiler Boiler Serial No!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Please enter Boiler Serial No"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>{' '}
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    name="commissioningOrinstallDate"
                                    label="Commissioning / Install Date"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter Commissioning / Install Date',
                                      },
                                    ]}
                                  >
                                    <DatePicker
                                      name="commissioningOrinstallDate"
                                      onChange={onDateChange}
                                      style={{ width: '100%' }}
                                      format="DD-MM-YYYY"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    label="Boiler Make"
                                    name="boilerMake"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please select boiler make',
                                      },
                                    ]}
                                  >
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
                                      disabled={disabledFlag}
                                    >
                                      {options &&
                                        options.map(
                                          (data: any) =>
                                            data &&
                                            data.boilerMake.map((val: any) => (
                                              <Option value={val._id}>{val.name}</Option>
                                            )),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    label="Boiler Model"
                                    name="boilerModel"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please select boiler model',
                                      },
                                    ]}
                                  >
                                    <Select
                                      showSearch
                                      placeholder="Please select any option"
                                      // style={{ width: 120 }}
                                      filterOption={(input, option: any) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      disabled={disabledFlag}
                                    >
                                      {boilerModels &&
                                        boilerModels.map((val: any) => (
                                          <Option value={val._id}>{val.name}</Option>
                                        ))}
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    label="Boiler Type"
                                    name="boilerType"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please select boiler type',
                                      },
                                    ]}
                                  >
                                    <Select
                                      showSearch
                                      placeholder="Please select any option"
                                      filterOption={(input, option: any) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      disabled={disabledFlag}
                                    >
                                      {options &&
                                        options.map(
                                          (data: any) =>
                                            data &&
                                            data.boilerType.map((val: any) => (
                                              <Option value={val._id}>{val.name}</Option>
                                            )),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    label="Fuel Type"
                                    name="fuelType"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please select Fuel Type',
                                      },
                                    ]}
                                  >
                                    <Select
                                      showSearch
                                      placeholder="Please select any option"
                                      // style={{ width: 120 }}
                                      filterOption={(input, option: any) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      disabled={disabledFlag}
                                    >
                                      {options &&
                                        options.map(
                                          (data: any) =>
                                            data &&
                                            data.fuelType.map((val: any) => (
                                              <Option value={val._id}>{val.name}</Option>
                                            )),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    // name="email"
                                    name="commissionedBy"
                                    label="Commissioned By"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please input Boiler Commissioned By!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Please enter Commissioned By"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    // name="email"
                                    name="gasSafeNumber"
                                    label="Gas Safe No"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please input Boiler Gas Safe No!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Please enter Gas Safe No"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  <Form.Item
                                    name="telephoneNo"
                                    label="Phone Number"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter your phone number!',
                                      },
                                    ]}
                                  >
                                    <PhoneInput
                                      // value={user.phone}
                                      inputStyle={{
                                        height: '40px',
                                        width: 'inherit',
                                        borderRadius: '0px',
                                      }}
                                      country={'gb'}
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>{' '}
                                </Col>
                              </Row>

                              <Row gutter={[16, 0]}>
                                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                  {/* <Form.Item
                              // name="email"
                              name="name"
                              label="Boiler Model"
                              rules={[
                                {
                                  // required: true,
                                  message: "Please input Boiler Boiler Model!",
                                },
                              ]}
                            >
                              <Input placeholder="Please enter Boiler Model" />
                            </Form.Item> */}
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}></Row>

                              {userInfo.type !== 'user' && (
                                <Row gutter={[16, 0]}>
                                  <Col xs={{ span: 24 }} md={{ span: 24 }}>
                                    <Form.Item
                                      name="engineerName"
                                      label="Engineers"
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please enter Engineer Name!',
                                        },
                                      ]}
                                    >
                                      {engineers && (
                                        <Select
                                          mode="multiple"
                                          showSearch
                                          placeholder="Please select engineer"
                                          // style={{ width: 120 }}
                                          onChange={handleEngineersSelection}
                                          filterOption={(input, option: any) =>
                                            option.children
                                              .toLowerCase()
                                              .indexOf(input.toLowerCase()) >= 0
                                          }
                                          disabled={disabledFlag}
                                        >
                                          {engineers &&
                                            engineers.map((val: any) => (
                                              <Option value={val._id}>{val.email}</Option>
                                            ))}
                                        </Select>
                                      )}
                                    </Form.Item>
                                  </Col>
                                </Row>
                              )}

                              <Row gutter={[16, 0]}>
                                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                                  <Form.Item
                                    name="comments"
                                    label="Comments"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter Comments!',
                                      },
                                    ]}
                                  >
                                    <TextArea rows={4} disabled={disabledFlag} />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={24}>
                                <Col xs={24} sm={8}>
                                  <Form.Item
                                    name="boilerPressure"
                                    label="Boiler Pressure"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Input Boiler Pressure!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Boiler Pressure"
                                      addonAfter="BAR"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                  <Form.Item
                                    name="kWRatedTo"
                                    label="KW Rated to"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Input KW Rated to!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="KW Rated to"
                                      addonAfter="KW"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                  <Form.Item
                                    name="flowTemp"
                                    label="Flow Temp"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Input Flow Temp!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Flow Temp"
                                      addonAfter="Celcius"
                                      disabled={disabledFlag}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <div className="form-actions" style={{ marginTop: '20px' }}>
                                <Button
                                  className="btn btn-squared mr-1"
                                  htmlType="button"
                                  onClick={onReset}
                                >
                                  Reset
                                </Button>

                                {!disabledFlag && (
                                  <Button
                                    className="login-form-button btn btn-squared btn-primary datapuppet-button"
                                    htmlType="submit"
                                    // loading={submitLoading}
                                  >
                                    Submit
                                  </Button>
                                )}
                              </div>
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
                  </TabPane>

                  {id && (
                    <TabPane tab="Boiler Services" key="2">
                      {id && (
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
                            <Table
                              allowAdd={true}
                              tableTitle="Boiler Services"
                              moduleName="service"
                              ref={tableRef}
                              getTableData={params => getCMSTableData(params)}
                              columns={columns}
                              onDelete={deleteService}
                              onAdd={() => router.push(`/add/service/${boilerSerialNo}`)}
                            />
                          </Card>
                        </Col>
                      )}
                    </TabPane>
                  )}
                </Tabs>
              </Col>
            </Row>
          </Layout.Content>
          <Footerhtml />
        </Layout>
      </Layout>
    </>
  )
}

export default connect()(AddBoiler)
