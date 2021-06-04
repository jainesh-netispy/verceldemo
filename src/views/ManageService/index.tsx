import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Popconfirm,
  Row,
  Col,
  Form,
  Switch,
  Tooltip,
  Layout,
  notification,
  Space,
  Input,
} from 'antd'
import _ from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { SyncOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { DispatchProp, connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import Footerhtml from '../../components/footer'
import moment from 'moment'
import CreateContent from './components/modal'
import { addService, getService, deleteService } from '../../redux/actions'
// import "./style1.scss";
import DashboardHeader from '../../components/header2'
import DashboardTopBar from '../../components/topbar'
import { openNotification } from '../../utils/notification'
import Table from '../../components/table'
import { useRouter } from 'next/router'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

const ManageService: React.FC<LoginProps> = function ({ dispatch, location, history }) {
  const router = useRouter()

  const [visibleDetails, setVisibleDetails] = useState(false)
  const [details, setDetails] = useState<any>('')

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const columns = [
    {
      title: 'Boiler Serial No',
      dataIndex: 'boilerInstallationId',
      sorter: {
        multiple: 1,
      },
      ...getColumnSearchProps('boilerInstallationId'),
      render: (cell, row) => <span> {cell ? cell.boilerSerialNumber : ''}</span>,
    },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      sorter: {
        multiple: 2,
      },
      ...getColumnSearchProps('serviceType'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Engineer Name',
      dataIndex: 'engineerName',
      sorter: {
        multiple: 4,
      },
      ...getColumnSearchProps('engineerName'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name.firstName} {name.lastName}
        </Tooltip>
      ),
    },

    {
      title: 'Company Name',
      dataIndex: 'companyName',
      sorter: {
        multiple: 5,
      },
      ...getColumnSearchProps('companyName'),
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
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {moment(name).format('DD MMM YYYY HH:mm:ss')}
        </Tooltip>
      ),
    },
    {
      title: 'Enable/Disable',
      dataIndex: 'status',
      width: '100px',
      filters: [
        {
          text: 'Enabled',
          value: 'active',
        },
        {
          text: 'Disabled',
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

  const [form] = Form.useForm()
  /* const [state, setState] = useKeepState(initialState); */
  const [currentActiveId, setCurrentActiveId] = useState('')
  const [currentDeleteActiveId, setCurrentDeleteActiveId] = useState('')
  const tableRef = useRef<any>()

  const statusChanged = (checked: boolean, row: any) => {
    const boilerServiceId = row._id
    const status = checked ? 'active' : 'deactive'
    const payload = { boilerServiceId, status }
    setCurrentActiveId(boilerServiceId)
    dispatch(addService(payload, 'edit')).then(res => {
      if (res.data) {
        openNotification(res && res.data && res.data.message)
        setCurrentActiveId('')
        getCMSTableData('')
        tableRef.current.getTableData()
      }
    })
  }
  function getCMSTableData(params: any) {
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

  typeof window !== 'undefined' ? localStorage.removeItem('backBoilerId') : null

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
                  tableTitle="Boiler Services"
                  moduleName="service"
                  ref={tableRef}
                  getTableData={getCMSTableData}
                  columns={columns}
                  onDelete={deleteService}
                  onAdd={() => router.push('/add/service')}
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

export default connect()(ManageService)
