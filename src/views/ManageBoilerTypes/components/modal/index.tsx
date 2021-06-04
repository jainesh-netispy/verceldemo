import React, { useEffect, useState } from 'react'
import { useSetState } from 'use-setstate'
import _ from 'lodash'
import { serviceCreateTodoList, serviceUpdateTodoList } from '../../../../services'
import { Button, Modal, Form, Input, Radio } from 'antd'
import ModalBodyClass from '../../../../components/modalBodyClass'
import { addBoilerModel, addBoilerType } from '../../../../redux/actions'
import { useDispatch } from 'react-redux'
import { openNotification } from '../../../../utils/notification'
type Props = {
  visible: boolean
  rowData?: { [key: string]: any } | null
  onSuccess: (res?: any) => void
  onCancel: () => void
  editBrand: boolean | false
}

const { TextArea } = Input
const initialState = {
  confirmLoading: false,
  name: '',
  shortDescription: '',
}

const CreateContent: React.FC<Props> = function ({
  visible,
  onSuccess,
  onCancel,
  rowData,
  editBrand,
}) {
  const [form] = Form.useForm()
  const [state, setState] = useSetState(initialState)
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  async function handleSubmitForm() {
    try {
      const values = await form.validateFields()
      const typeId = rowData && rowData._id
      const params = {
        ...values,
        typeId,
      }
      setState({ ...state, confirmLoading: true })
      //   (!rowData
      //     ? addBrand(values)
      //     : serviceUpdateTodoList(rowData._id, values)
      //   ).then((res) => {
      dispatch(addBoilerType(editBrand ? params : values, editBrand ? 'Edit' : 'Add')).then(res => {
        setState({ ...state, confirmLoading: false })
        if (res) {
          form.resetFields()
          // setVisibleAddBrand(false);
          // getBrandList();
          onSuccess(res)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (visible && rowData && editBrand) {
      form.setFieldsValue({
        name: rowData.name,
        shortDescription: rowData.shortDescription,
      })
    }
  }, [visible, rowData])

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible])

  return (
    <div>
      <Modal
        title={`${editBrand ? 'Edit' : 'Add'} Types`}
        visible={visible}
        onCancel={onCancel}
        confirmLoading={state.confirmLoading}
        forceRender
        centered
        width={'35%'}
        footer=""
      >
        {/* <Form 
          scrollToFirstError
          onFinish={handleSubmitForm}
          form={form}
        >  */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitForm}
          //   className="login-form"
          //   autoComplete="random-string"
        >
          <Form.Item
            style={{ width: '100%' }}
            // name="email"
            name="name"
            label="Type Name"
            rules={[
              {
                required: editBrand ? false : true,
                message: 'Please input types name!',
              },
            ]}
          >
            <Input
              //   defaultValue={rowData.name}
              size="middle"
              placeholder="Please enter Type name"
            />
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            // name="email"
            name="shortDescription"
            label="Type Description"
            rules={[
              {
                required: editBrand ? false : true,
                message: 'Please input Type description!',
              },
            ]}
          >
            <TextArea rows={4} placeholder="Please enter Type description" />
          </Form.Item>
          <div className="form-actions" style={{ marginTop: '20px' }}>
            <Button
              className="login-form-button btn btn-squared btn-primary datapuppet-button"
              htmlType="submit"
              loading={state.confirmLoading}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
      <ModalBodyClass isModalVisible={visible} />
    </div>
  )
}

export default React.memo(CreateContent)
