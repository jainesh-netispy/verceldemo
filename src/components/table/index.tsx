import React, { FC, useEffect } from 'react'
import { Table, Button, Popconfirm, Card, Typography } from 'antd'
import { TableProps } from 'rc-table/lib/Table'
import { AxiosPromise } from 'axios'
import _ from 'lodash'
import useDebounceFn from '../../hooks/useDebounceFn'
import { SyncOutlined } from '@ant-design/icons'
import { useSetState } from 'use-setstate'

interface Props extends TableProps {
  getTableData: (data: any) => AxiosPromise
  onTableChange?: (pagination: any, filters: any, sorter: any) => void
  onDelete?: (id: string) => AxiosPromise
  onAdd?: () => void
  [key: string]: any
}

interface State {
  tableHeight: number
  tableDataSource: any[]
  isLoading: boolean
  pagination: {
    [key: string]: any
  }
  selectedRowKeys: string[]
  columns: any[]
}

const DEFAULT_PAGE_SIZE = 10

function showTotal(total: number) {
  return `Total ${total} Records`
}

const TableFC: FC<Props> = ({
  getTableData,
  onTableChange,
  onDelete,
  onAdd,
  forwardedRef: tableRef,
  columns,
  ...props
}) => {
  const initialState: State | any = {
    tableHeight: 0,
    tableDataSource: [],
    isLoading: true,
    pagination: {
      pageNo: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      showSizeChanger: true,
      total: 0,
      pageSizeOptions: ['10', '25', '50', '100', '500'],
    },
    selectedRowKeys: [],
    columns: columns,
  }
  let rowSelection
  const showRowSelection = onDelete
  const [state, setState] = useSetState(initialState)

  const { run: getData } = useDebounceFn(
    () => {
      setState({ isLoading: true })
      const { pageNo, pageSize } = tableRef.current
      const filters = state && state.filters ? state.filters : ''
      const sorter = state && state.sorter ? state.sorter : ''
      const finalParams: any = {
        page: pageNo,
        limit: pageSize,
        sorting: [],
      }

      if (filters) {
        _.forEach(filters, function (value, key) {
          /* if (_.isArray(value) || _.isObject(value)) {
            _.forEach(value, function (objValue, objKey) {
              if (!finalParams[`filterBy${_.upperFirst(key)}`]) {
                finalParams[`filterBy${_.upperFirst(key)}`] = [];
              }
              finalParams[`filterBy${_.upperFirst(key)}`].push(objValue);
            });
          } else { */
          finalParams[`filterBy${_.upperFirst(key)}`] = value ? value[0] : ''
          //}
        })
      }

      if (sorter) {
        _.forEach(sorter, function (value: { field: '' }, key) {
          if (!_.isObject(value)) {
            // finalParams[`sortBy${_.upperFirst(sorter['field'])}`] = value && sorter['order'] === 'ascend' ? 1 : -1;
            if (key === 'field') {
              const temp = `${sorter['field']}_${value && sorter['order'] === 'ascend' ? 1 : -1}`
              finalParams['sorting'].push(temp)
            }
          } else if (_.size(sorter) > 1 && _.isObject(value) /* && value.field */) {
            // finalParams[`sortBy${_.upperFirst(value && value.field)}`] = value && value.order === 'ascend' ? 1 : -1;
            const temp = `${value.field}_${value && sorter['order'] === 'ascend' ? 1 : -1}`
            finalParams['sorting'].push(temp)
          }
        })
      }
      getTableData(finalParams)
        .then(res => {
          if (res?.data?.success) {
            setState({
              columns,
              pagination: {
                ...state.pagination,
                total:
                  res.data.data && res.data.data.count ? res.data.data.count : res.data.data.total,
                pageSize,
              },
              tableDataSource: res.data.data.list,
              isLoading: false,
            })
          }
        })
        .finally(() => {
          // setState({ isLoading: false })
        })
    },
    { wait: 500, leading: true },
  )

  function onChange(pagination: any, filters: any, sorter: any) {
    const pageNo = pagination.current
    const pageSize = pagination.pageSize
    setState({
      pagination: {
        ...state.pagination,
        pageNo,
        pageSize,
      },
      filters,
      sorter,
    })
    tableRef.current.pageNo = pageNo
    tableRef.current.pageSize = pageSize
    onTableChange?.(pagination, filters, sorter)
    setTimeout(() => {
      getData()
    })
  }

  useEffect(() => {
    if (!tableRef.current) {
      tableRef.current = {}
    }
    tableRef.current.getTableData = getData
  })

  useEffect(() => {
    tableRef.current.pageNo = 1
    tableRef.current.pageSize = DEFAULT_PAGE_SIZE
  }, [tableRef])

  useEffect(() => {
    setTimeout(() => {
      const tableEl = document.querySelector('.ant-table-wrapper')
      if (tableEl) {
        setState({ tableHeight: tableEl.clientHeight - 120 })
      }
    }, 0)
  }, [])

  useEffect(() => {
    if (Array.isArray(columns)) {
      setState({
        columns: [
          /* {
            title: 'No',
            width: 60,
            render: (_: any, $: any, i: number) => i + 1,
            align: 'center',
          }, */
        ].concat(columns as []),
      })
    }
  }, [columns])

  /* function handleDelete() {
    if (!onDelete) return null;
    const selectedRowKeys = state.selectedRowKeys.join(',');
    onDelete(selectedRowKeys).then((res) => {
      if (res.data.success) {
        setState({ selectedRowKeys: [] });
        getData();
      }
    });
  } */

  function reloadTable() {
    getData()
  }

  if (showRowSelection) {
    rowSelection = {
      onChange(selectedRowKeys: string[]) {
        setState({ selectedRowKeys })
      },
    }
  }
  return (
    <React.Fragment>
      <Card
        title={
          <div>
            {props.tableTitle || 'Table'}&nbsp;
            <SyncOutlined onClick={() => reloadTable()} />
          </div>
        }
        bordered={false}
        extra={
          <div>
            {props.allowAdd && (
              <Button type="primary" className="mr-3" onClick={onAdd}>
                Add {props.moduleName ? props.moduleName : ''}
              </Button>
            )}
            {props.deleteManyEnabled && (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => onDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button className="ml-3" danger>
                  Delete All
                </Button>
              </Popconfirm>
            )}
          </div>
        }
      >
        <Table
          {...(props as any)}
          rowKey="_id"
          loading={state.isLoading}
          columns={state.columns}
          dataSource={state && state.tableDataSource}
          /* scroll={{ y: state.tableHeight + 'px', x: 1200 }} */
          showHeader={state.tableDataSource && state.tableDataSource.length}
          onChange={onChange}
          /* rowSelection={rowSelection} */
          pagination={{
            ...state.pagination,
            showTotal,
          }}
        />
      </Card>
    </React.Fragment>
  )
}

const forwardedTable = React.forwardRef((props: any, ref) => (
  <TableFC {...props} forwardedRef={ref} />
))

export default React.memo(forwardedTable)
