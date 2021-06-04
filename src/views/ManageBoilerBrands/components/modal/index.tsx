import React, { useEffect, useState } from 'react'
// import useKeepState from 'use-keep-state'
import _ from 'lodash'
import { serviceCreateTodoList, serviceUpdateTodoList } from '../../../../services'
import { Button, Modal, Form, Input, Radio } from 'antd'
import ModalBodyClass from '../../../../components/modalBodyClass'
import { addBrand } from '../../../../redux/actions'
import { useDispatch } from 'react-redux'
import { openNotification } from '../../../../utils/notification'

type Props = {
  visible: boolean
  rowData?: { [key: string]: any } | null
  onSuccess: (res?: any) => void
  onCancel: () => void
  editBrand: boolean
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
  const [state, setState] = useState(initialState)
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  async function handleSubmitForm() {
    try {
      const values = await form.validateFields()
      const brandId = rowData && rowData._id
      const params = {
        ...values,
        brandId,
      }
      setState({ ...state, confirmLoading: true })
      //   (!rowData
      //     ? addBrand(values)
      //     : serviceUpdateTodoList(rowData._id, values)
      //   ).then((res) => {
      dispatch(addBrand(editBrand ? params : values, editBrand ? 'Edit' : 'Add')).then(res => {
        setState({ ...state, confirmLoading: false })
        if (res) {
          form.resetFields()
          // setVisibleAddBrand(false);
          // getBrandList();
          // setState(initialState)
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
        title={`${editBrand ? 'Edit' : 'Add'} Brands`}
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
            label="Brand Name"
            rules={[
              {
                required: editBrand ? false : true,
                message: 'Please input Brand name!',
              },
            ]}
          >
            <Input
              //   defaultValue={rowData.name}
              size="middle"
              placeholder="Please enter Brand name"
            />
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            // name="email"
            name="shortDescription"
            label="Brand Description"
            rules={[
              {
                required: editBrand ? false : true,
                message: 'Please input Brand description!',
              },
            ]}
          >
            <TextArea
              // size="middle"
              rows={4}
              //   defaultValue={rowData.shortDescription}
              placeholder="Please enter Brand description"
            />
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
