import React, { useEffect, useState } from 'react'
import { useSetState } from 'use-setstate'
import _ from 'lodash'
import { serviceCreateTodoList, serviceUpdateTodoList } from '../../../../services'
import { Button, Modal, Form, Input, Descriptions } from 'antd'
import ModalBodyClass from '../../../../components/modalBodyClass'
import { addBrand } from '../../../../redux/actions'
import { useDispatch } from 'react-redux'
import { openNotification } from '../../../../utils/notification'
import moment from 'moment'
type Props = {
  visible: boolean
  rowData?: { [key: string]: any } | null
  // onSuccess: (res?: any) => void;
  onCancel: () => void
  // editBrand: boolean;
}

const { TextArea } = Input
const initialState: any = {
  confirmLoading: false,
  name: '',
  shortDescription: '',
}

const CreateContent: React.FC<Props> = function ({
  visible,
  // onSuccess,
  onCancel,
  rowData,
  // editBrand,
}) {
  const [form] = Form.useForm()
  const [state, setState] = useSetState(initialState)
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (visible && rowData) {
      setState(rowData)
      // form.setFieldsValue({
      //   name: rowData.name,
      //   shortDescription: rowData.shortDescription,
      // });
    }
  }, [visible, rowData])

  useEffect(() => {
    if (!visible) {
      // form.resetFields();
      setState(initialState)
    }
  }, [visible])
  // console.log(state);

  return (
    <div>
      <Modal
        // title={` Brands`}
        visible={visible}
        onCancel={onCancel}
        // confirmLoading={state.confirmLoading}
        forceRender
        centered
        width={'60%'}
        footer=""
      >
        {/* <Form 
          scrollToFirstError
          onFinish={handleSubmitForm}
          form={form}
        >  */}
        <Descriptions title="User Info" bordered column={1}>
          <Descriptions.Item label="First Name">{state.firstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{state.lastName}</Descriptions.Item>
          <Descriptions.Item label="Email">{state.email}</Descriptions.Item>
          <Descriptions.Item label="Mobile No">{state.mobileNo}</Descriptions.Item>
          <Descriptions.Item label="Gas Safe No">{state.gasSafeNumber}</Descriptions.Item>

          <Descriptions.Item label="License No">{state.licenseNo}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {state.createdAt ? moment(state.createdAt).format('DD MMM YYYY h:mm:ss A') : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {state.updatedAt ? moment(state.updatedAt).format('DD MMM YYYY h:mm:ss A') : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <ModalBodyClass isModalVisible={visible} />
    </div>
  )
}

export default React.memo(CreateContent)
