import React from 'react'
import { Button, Dropdown, Menu, message } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { getExportData } from '../redux/actions'
import { sound } from '../constants'
import { openNotification } from '../utils/notification'
import { DownOutlined } from '@ant-design/icons'
import { LOCAL_STORAGE } from './storage'

const ExportData = () => {
  function downloadFile(content: string, type: any, fileName: string = 'download'): void {
    if (type !== 'pdf') {
      const dataURI = generateDataURI(content, type)
      const anchor = document.createElement('a')
      anchor.href = dataURI
      anchor.download = fileName
      anchor.setAttribute('style', 'visibility:hidden')
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    } else {
      const link = document.createElement('a')
      link.href = 'https://192.168.0.150:3333/api/users/export/pdf'
      link.download = 'user.pdf'
      console.log(link)
      link.click()
    }
  }
  function generateDataURI(content: string, type: any): string {
    switch (type) {
      //   case "txt": {
      //     return "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      //   }

      case 'csv': {
        return 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(content)
      }
      case 'xls': {
        return 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(content)
      }
      case 'pdf': {
        return 'data:application/pdf;charset=utf-8,' + encodeURIComponent(content)
      }
      default: {
        return ''
      }
    }
  }
  const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
  const dispatch = useDispatch<any>()
  const getExport = ({ key }) => {
    try {
      dispatch(getExportData(key)).then((res: any) => {
        if (res) {
          downloadFile(res && res.data, key, 'user')
          openNotification(res && res.data.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const menu = (
    <Menu onClick={getExport}>
      {/* <Menu.Item key="txt">txt</Menu.Item> */}
      {/* <Menu.Item key="pdf">pdf</Menu.Item> */}
      <Menu.Item key="csv">CSV</Menu.Item>
      <Menu.Item key="xls">XLS</Menu.Item>
    </Menu>
  )

  return (
    <>
      {userInfo && userInfo.user && userInfo.user.role === 'A' ? (
        <Dropdown overlay={menu}>
          <Button
            className="datapuppet-button"
            style={{
              width: '90px',
            }}
            onClick={(e: any) => {
              sound()
              // getExport();
            }}
          >
            Export <DownOutlined />
          </Button>
        </Dropdown>
      ) : (
        ''
      )}
    </>
  )
}

export default connect()(ExportData)
