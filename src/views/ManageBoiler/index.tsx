import React, { useState, useEffect, useRef } from 'react'
import {
  Row,
  Col,
  Tooltip,
  Form,
  Layout,
  Button,
  Popconfirm,
  Input,
  Switch,
  Select,
  notification,
  Menu,
  Space,
} from 'antd'
import _ from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { SyncOutlined, SearchOutlined } from '@ant-design/icons'
import { DispatchProp, connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { addBoiler, getBoiler, deleteBoiler } from '../../redux/actions'
import { AnyAction } from 'redux'
import CreateContent from './components/modal'
import DashboardHeader from '../../components/header2'
import DashboardTopBar from '../../components/topbar'
// import './style1.scss'
import moment from 'moment'
import Footerhtml from '../../components/footer'
import Table from '../../components/table'
import { openNotification } from '../../utils/notification'
import { Link } from 'react-router-dom'
// import logo from "@/assets/img/logo-white.png";
import { useRouter } from 'next/router'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
const { TextArea } = Input
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps
const { Option } = Select

const { Sider } = Layout
const { SubMenu, Divider } = Menu

const ManageBoiler: React.FC<LoginProps> = function ({ dispatch, history }) {
  const router = useRouter()
  const [visibleDetails, setVisibleDetails] = useState(false)
  const [details, setDetails] = useState<any>('')

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const columns: any = [
    {
      title: 'Serial No',
      dataIndex: 'boilerSerialNumber',
      key: 'boilerSerialNumber',
      align: 'left',
      width: '150px',
      sorter: {
        multiple: 1,
      },
      ...getColumnSearchProps('boilerSerialNumber'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Boiler Model',
      dataIndex: 'boilerModel',
      sorter: {
        multiple: 2,
      },
      width: '150px',
      // key: "shortDescription",
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{row.boilerModel.name}</span>}>
          {row ? row.boilerModel.name : ''}
        </Tooltip>
      ),
    },
    {
      title: 'Commissioned By',
      dataIndex: 'commissionedBy',
      sorter: {
        multiple: 4,
      },
      key: 'commissionedBy',
      ...getColumnSearchProps('commissionedBy'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Commissioning / Install Date',
      dataIndex: 'commissioningOrinstallDate',
      sorter: {
        multiple: 6,
      },
      // key: "shortDescription",
      render: (name, row) => <span>{moment(name).format('DD MMM YYYY')}</span>,
    },
    {
      title: 'Boiler Pressure',
      dataIndex: 'boilerPressure',
      sorter: {
        multiple: 12,
      },
      ...getColumnSearchProps('boilerPressure'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: "Enable/Disable",
      dataIndex: 'status',
      // key: "status",
      width: '100px',
      // ellipsis: {
      //   showTitle: false,
      // },
      filters: [
        {
          text: "Enable",
          value: "active",
        },
        {
          text: "Disable",
          value: "deactive",
        },
      ],
      filterMultiple: false,
      render: (data, row) => (
        <Switch
          // defaultChecked={row.status === "active" ? true : false}
          // onClick={() => handleEditStatus(row)}
          defaultChecked={row.status === "active" || false}
          onChange={(checked) => statusChanged(checked, row)}
          loading={currentActiveId === row._id || false}
        />
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, row) => (
        <Col span={24}>
          <Button
            type="primary"
            style={{
              // width: "100px",
              marginBottom: '10px',
              marginRight: '10px',
            }}
            onClick={() => router.push(`/boiler/details/save/${row._id}`)}
            // className="datapuppet-button"
            // style={{ marginLeft: "10px" }}
          >
            Edit
          </Button>
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
              onConfirm={(e) => handleActionButton(e, row._id)}
              placement="bottomLeft"
            >
              <Button
                danger
                loading={currentDeleteActiveId === row._id || false}
              >
                Delete
              </Button>
            </Popconfirm>
          )}
        </Col>
      ),
    },
  ]

  const [form] = Form.useForm()
  /* const [state, setState] = useKeepState(initialState); */
  const [currentActiveId, setCurrentActiveId] = useState('')
  const [currentDeleteActiveId, setCurrentDeleteActiveId] = useState('')
  const tableRef = useRef<any>()

  const statusChanged = (checked: boolean, row: any) => {
    const boilerId = row._id
    const status = checked ? 'active' : 'deactive'
    const payload = { boilerId, status }
    setCurrentActiveId(boilerId)
    dispatch(addBoiler(payload, 'edit')).then(res => {
      if (res.data) {
        openNotification(res && res.data && res.data.message)
        setCurrentActiveId('')
        getCMSTableData('')
        tableRef.current.getTableData()
      }
    })
  }
  function getCMSTableData(params: any) {
    return dispatch(getBoiler(params)).then(res => {
      res.data.data.list.map((item: any) => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm')
        return item
      })
      return res
    })
  }

  function handleActionButton(e, boilerId) {
    if (!boilerId) {
      notification.error({
        message: `Error`,
        description: 'Invalid Access',
      })
      return false
    }
    setCurrentDeleteActiveId(boilerId)
    dispatch(deleteBoiler(boilerId)).then(res => {
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

  const menuSettings = {
    width: 256,
    collapsible: true,
    /* collapsed: isMenuCollapsed,
    onCollapse: this.onCollapse, */
    breakpoint: 'lg',
  }

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
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
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
                  allowAdd={true}
                  tableTitle="Boiler Installations"
                  moduleName="Boiler"
                  ref={tableRef}
                  getTableData={getCMSTableData}
                  columns={columns}
                  onDelete={deleteBoiler}
                  onAdd={() => router.push('/add/boiler')}
                />
              </Col>
            </Row>
          </Layout.Content>
          <Footerhtml />
        </Layout>
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
      </Layout>
    </>
  )
}

export default connect()(ManageBoiler)
