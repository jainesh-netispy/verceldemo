import React, { useEffect, useState } from 'react'
import { useSetState } from 'use-setstate'
import _ from 'lodash'
import { Button, Modal, Form, Input, Select } from 'antd'
import ModalBodyClass from '../../../../components/modalBodyClass'
import { addBoilerModel, getOptions } from '../../../../redux/actions'
import { useDispatch } from 'react-redux'

type Props = {
  visible: boolean
  rowData?: { [key: string]: any } | null
  onSuccess: (res?: any) => void
  onCancel: () => void
  editBrand: boolean
  titleLabel: string
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
  titleLabel,
}) {
  const [form] = Form.useForm()
  const [state, setState] = useSetState(initialState)
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const { Option } = Select
  const [options, setOptions] = useState<any>([])

  useEffect(() => {
    getOption()
  }, [])

  const getOption = async () => {
    try {
      dispatch(getOptions()).then((res: any) => {
        if (res) {
          setOptions(res.data.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSubmitForm() {
    try {
      const values = await form.validateFields()
      const modelId = rowData && rowData._id
      const params = {
        ...values,
        modelId,
      }
      setState({ ...state, confirmLoading: true })
      //   (!rowData
      //     ? addBrand(values)
      //     : serviceUpdateTodoList(rowData._id, values)
      //   ).then((res) => {
      dispatch(addBoilerModel(editBrand ? params : values, editBrand ? 'Edit' : 'Add')).then(
        res => {
          setState({ ...state, confirmLoading: false })
          if (res) {
            form.resetFields()
            // setVisibleAddBrand(false);
            // getBrandList();
            onSuccess(res)
          }
        },
      )
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

  function handleChangeBoilerMake(value) {
    console.log(`selected ${value}`)
  }

  return (
    <div>
      <Modal
        title={`${editBrand ? 'Edit' : 'Add'} ${titleLabel ? titleLabel : 'Brands'}`}
        visible={visible}
        onCancel={onCancel}
        confirmLoading={state.confirmLoading}
        forceRender
        centered
        width={'35%'}
        footer=""
      >
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Form.Item
            label="Boiler Brand"
            name="boilerBrandId"
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
              onChange={handleChangeBoilerMake}
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options &&
                options.map(
                  (data: any) =>
                    data &&
                    data.boilerMake.map((val: any) => <Option value={val._id}>{val.name}</Option>),
                )}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            name="name"
            label={`${titleLabel} Name`}
            rules={[
              {
                required: editBrand ? false : true,
                message: 'Please input model name!',
              },
            ]}
          >
            <Input size="middle" placeholder={`Please enter ${titleLabel} name`} />
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            name="shortDescription"
            label={`${titleLabel} Description`}
            rules={[
              {
                required: editBrand ? false : true,
                message: 'Please input description!',
              },
            ]}
          >
            <TextArea rows={4} placeholder="Please enter Brand description" />
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
