import React, { useState, useEffect, useRef } from 'react'
import {
  Row,
  Col,
  Tooltip,
  Layout,
  Popconfirm,
  Button,
  Form,
  Input,
  Switch,
  notification,
  Space,
} from 'antd'
import _ from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { SyncOutlined, SearchOutlined } from '@ant-design/icons'
import { DispatchProp, connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { getBoilerType, addBoilerType, deleteType } from '../../redux/actions'
import { AnyAction } from 'redux'
import DashboardHeader from '../../components/header2'
import DashboardTopBar from '../../components/topbar'
import moment from 'moment'
import Footerhtml from '../../components/footer'
import Modal from 'antd/lib/modal/Modal'
import ModalBodyClass from '../../components/modalBodyClass'
import { openNotification } from '../../utils/notification'
import CreateContent from './components/modal'
import Table from '../../components/table'
type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
const { TextArea } = Input
type LoginProps = {
  dispatch: ThunkDispatchProps
} & DispatchProp &
  RouteComponentProps

const ManageBoilerTypes: React.FC<LoginProps> = function ({ dispatch }) {
  const [visibleAddBoilerModel, setVisibleAddBoilerModel] = useState(false)
  const [visibleEditModel, setVisibleEditModel] = useState(false)
  const [modelDetails, setModelDetails] = useState<any>('')

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleEditBrand = (data: any) => {
    setVisibleAddBoilerModel(true), setVisibleEditModel(true), setModelDetails(data)
    // console.log(data, "brand data");
  }

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      // key: "name",
      align: 'left',
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, row) => row.name.includes(value),
      // sorter: (a, b) => a.name.localeCompare(b.name),
      // sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: {
        showTitle: false,
      },
      sorter: {
        multiple: 1,
      },
      ...getColumnSearchProps('name'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Short Description',
      dataIndex: 'shortDescription',
      sorter: {
        multiple: 2,
      },
      // key: "shortDescription",
      ...getColumnSearchProps('shortDescription'),
      render: (name, row) => (
        <Tooltip placement="topLeft" title={<span>{name}</span>}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      // key: "createdAt",
      sorter: {
        multiple: 3,
      },
      render: (name, row) => (
        <Tooltip
          placement="topLeft"
          title={<span>{moment(name).format('DD MMM YYYY h:mm:ss A')}</span>}
        >
          {moment(name).format('DD MMM YYYY h:mm:ss A')}
        </Tooltip>
      ),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      // key: "updatedAt",
      sorter: {
        multiple: 4,
      },
      render: (name, row) => (
        <Tooltip
          placement="topLeft"
          title={<span>{moment(name).format('DD MMM YYYY h:mm:ss A')}</span>}
        >
          {moment(name).format('DD MMM YYYY h:mm:ss A')}
        </Tooltip>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      // key: "status",
      width: '100px',
      // ellipsis: {
      //   showTitle: false,
      // },
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
      render: (data, row) => (
        <Switch
          // defaultChecked={row.status === "active" ? true : false}
          // onClick={() => handleEditStatus(row)}
          defaultChecked={row.status === 'active' || false}
          onChange={checked => statusChanged(checked, row)}
          loading={currentActiveId === row._id || false}
        />
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, row: any) => (
        <Col span={24}>
          <Button
            type="primary"
            style={{
              // width: "100px",
              marginBottom: '10px',
              marginRight: '10px',
            }}
            onClick={() => handleEditBrand(row)}
            // className="datapuppet-button"
            // style={{ marginLeft: "10px" }}
          >
            Edit
          </Button>
          {/* <Button
            style={{
              width: "90px",
              marginBottom: "10px",
              marginRight: "10px",
            }}

            // style={{ backgroundColor: "#6610F2", border: "none" }}
            // className="ml-1"
          >
            Details
          </Button> */}
          {/* <Popconfirm
            title="Are you sure delete this data?"
            onConfirm={(e) => confirm(row._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              style={{
                width: "100px",
                marginBottom: "10px",
                marginRight: "10px",
              }}
            >
              Delete
            </Button>
          </Popconfirm> */}
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
      ),
    },
  ]

  const [form] = Form.useForm()
  /* const [state, setState] = useKeepState(initialState); */
  const [currentActiveId, setCurrentActiveId] = useState('')
  const [currentDeleteActiveId, setCurrentDeleteActiveId] = useState('')
  const tableRef = useRef<any>()

  const statusChanged = (checked: boolean, row: any) => {
    const typeId = row._id
    const status = checked ? 'active' : 'deactive'
    const payload = { typeId, status }
    setCurrentActiveId(typeId)
    dispatch(addBoilerType(payload, 'edit')).then(res => {
      if (res.data) {
        openNotification(res && res.data && res.data.message)
        setCurrentActiveId('')
        getCMSTableData('')
        tableRef.current.getTableData()
      }
    })
  }
  function getCMSTableData(params: any) {
    return dispatch(getBoilerType(params)).then(res => {
      res.data.data.list.map((item: any) => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm')
        return item
      })
      return res
    })
  }

  function handleActionButton(e, typeId) {
    if (!typeId) {
      notification.error({
        message: `Error`,
        description: 'Invalid Access',
      })
      return false
    }
    setCurrentDeleteActiveId(typeId)
    dispatch(deleteType(typeId)).then(res => {
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
                  allowAdd={true}
                  tableTitle="Boiler Types"
                  moduleName="type"
                  ref={tableRef}
                  getTableData={getCMSTableData}
                  columns={columns}
                  onDelete={deleteType}
                  onAdd={() => setVisibleAddBoilerModel(true)}
                />
                <CreateContent
                  visible={visibleAddBoilerModel}
                  onSuccess={res => (
                    openNotification(res && res.data && res.data.message),
                    setVisibleAddBoilerModel(false),
                    setVisibleEditModel(false),
                    tableRef.current.getTableData()
                  )}
                  onCancel={() => (
                    setVisibleAddBoilerModel(false), setVisibleEditModel(false), setModelDetails('')
                  )}
                  rowData={modelDetails}
                  editBrand={visibleEditModel}
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

export default connect()(ManageBoilerTypes)
