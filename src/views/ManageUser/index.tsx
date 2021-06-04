import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Input,
  Popconfirm,
  Row,
  Col,
  Form,
  Switch,
  Radio,
  Divider,
  Descriptions,
  Spin,
  Tooltip,
  Alert,
  Layout,
  notification,
  Space,
} from 'antd'
import _ from 'lodash'
import Table from '../../components/table'
import Highlighter from 'react-highlight-words'
import { SyncOutlined, SearchOutlined } from '@ant-design/icons'
import { RouteComponentProps } from 'react-router-dom'
import { DispatchProp, connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import ModalBodyClass from '../../components/modalBodyClass'
import Footerhtml from '../../components/footer'
import moment from 'moment'
import CreateContent from './components/modal'
import {
  getUsers,
  deleteUser,
  getCurrentUserS,
  updateUser,
  deleteFuelType,
  getFuelType,
  addFuelType,
  addUser,
} from '../../redux/actions'
import PhoneInput from 'react-phone-input-2'
import Modal from 'antd/lib/modal/Modal'
import DashboardHeader from '../../components/header2'
import DashboardTopBar from '../../components/topbar'
import { sound } from '../../constants'
import { openNotification } from '../../utils/notification'
import ExportData from '../../constants/ExportData'
type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

const ManageUser: React.FC<LoginProps> = function ({ dispatch, location, history }) {
  const [visibleDetails, setVisibleDetails] = useState(false)
  const [details, setDetails] = useState<any>('')
  // const [form] = Form.useForm();

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      // key: "firstName",
      // filteredValue: filteredInfo.firstName || null,
      // /* ...getColumnSearchProps("firstName"), */
      // onFilter: (value, record) => record.firstName.includes(value),
      // sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      // sortOrder: sortedInfo.columnKey === "firstName" && sortedInfo.order,
      ellipsis: {
        showTitle: false,
      },
      sorter: {
        multiple: 1,
      },
      ...getColumnSearchProps('firstName'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: {
        multiple: 2,
      },
      ellipsis: {
        showTitle: false,
      },
      ...getColumnSearchProps('lastName'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Email address',
      dataIndex: 'email',
      sorter: {
        multiple: 3,
      },
      ellipsis: {
        showTitle: false,
      },
      ...getColumnSearchProps('email'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    // {
    //   title: "Phone number",
    //   dataIndex: "phone",
    //   sorter: {
    //     multiple: 4,
    //   },
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (name, row) => (
    //     <Tooltip placement="topLeft" title={<span>{name}</span>}>
    //       {name}
    //     </Tooltip>
    //   ),
    //   /*   ...getColumnSearchProps("phone"), */
    // },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   sorter: {
    //     multiple: 5,
    //   },
    //   render: (name, row) => (
    //     <Tooltip
    //       placement="topLeft"
    //       title={<span>{moment(name).format("DD MMM YYYY h:mm:ss A")}</span>}
    //     >
    //       {moment(name).format("DD MMM YYYY h:mm:ss A")}
    //     </Tooltip>
    //   ),
    // },
    // {
    //   title: "Updated At",
    //   dataIndex: "updatedAt",
    //   sorter: {
    //     multiple: 6,
    //   },
    //   render: (name, row) => (
    //     <Tooltip
    //       placement="topLeft"
    //       title={<span>{moment(name).format("DD MMM YYYY h:mm:ss A")}</span>}
    //     >
    //       {moment(name).format("DD MMM YYYY h:mm:ss A")}
    //     </Tooltip>
    //   ),
    // },
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
        <Switch
          // defaultChecked={row.status === "ACTIVE" ? true : false}
          // onClick={(e) => {
          //   editUserDetails(row._id, row.status);
          //   sound();
          // }}
          defaultChecked={row.status === 'active' || false}
          onChange={checked => statusChanged(checked, row)}
          loading={currentActiveId === row._id || false}
        />
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, row) => (
        <Row>
          {' '}
          <Col span={24}>
            {/* <Button
              type="primary"
              style={{
                // width: "100px",
                marginBottom: "10px",
                marginRight: "10px",
              }}
              onClick={() => history.push(`/edit/user/${row._id}`)}
              // className="datapuppet-button"
              // style={{ marginLeft: "10px" }}
            >
              Edit
            </Button> */}
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
          </Col>
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

  const [form] = Form.useForm()
  /* const [state, setState] = useKeepState(initialState); */
  const [currentActiveId, setCurrentActiveId] = useState('')
  const [currentDeleteActiveId, setCurrentDeleteActiveId] = useState('')
  const tableRef = useRef<any>()

  const statusChanged = (checked: boolean, row: any) => {
    const userId = row._id
    const status = checked ? 'active' : 'deactive'
    const payload = { userId, status }
    setCurrentActiveId(userId)
    dispatch(addUser(payload, 'edit')).then(res => {
      if (res.data) {
        openNotification(res && res.data && res.data.message)
        setCurrentActiveId('')
        getCMSTableData('')
        tableRef.current.getTableData()
      }
    })
  }
  function getCMSTableData(params: any) {
    return dispatch(getUsers()).then(res => {
      res.data.data.list.map((item: any) => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm')
        return item
      })
      return res
    })
  }

  function handleActionButton(e, userId) {
    if (!userId) {
      notification.error({
        message: `Error`,
        description: 'Invalid Access',
      })
      return false
    }
    setCurrentDeleteActiveId(userId)
    dispatch(deleteUser(userId)).then(res => {
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

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          // searchInput.current.select();
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm()
    /*  setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex); */
    const filterName = `filterBy${_.upperFirst(dataIndex)}`
    console.log('filterName', filterName)
    console.log('dataIndex', dataIndex)
    getCMSTableData({ filterName: dataIndex })
    /*  modifyFilter({ [filterName]: selectedKeys[0] }); */
  }

  function handleReset(clearFilters) {
    clearFilters()
    setSearchText('')
    /* resetFilter(); */
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
                <Table
                  allowAdd={false}
                  tableTitle="Users"
                  moduleName="user"
                  ref={tableRef}
                  getTableData={getCMSTableData}
                  columns={columns}
                  onDelete={deleteFuelType}
                  onAdd={() => history.push('/add/user')}
                />
              </Col>
            </Row>
          </Layout.Content>
          <Footerhtml />
        </Layout>
      </Layout>
    </>
  )
}

export default connect()(ManageUser)
