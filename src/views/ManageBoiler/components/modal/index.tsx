import React, { useEffect, useState } from 'react'
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
  const [state, setState] = useState(initialState)
  const [description, setDescription] = useState('')
  const dispatch:any = useDispatch()

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
        visible={visible}
        onCancel={onCancel}
        forceRender
        centered
        width={"60%"}
        footer=""
      >
        <Descriptions title="Boiler Info" bordered>
          <Descriptions.Item label="Serial No">
            {state.boilerSerialNumber ? state.boilerSerialNumber : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Model">
            {state.boilerModel ? state.boilerModel.name : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Commissioned By">
            {state.commissionedBy ? state.commissionedBy : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Postcode">
            {state.postCode ? state.postCode : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Gas Safe No">
            {state.gasSafeNumber ? state.gasSafeNumber : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Commissioning / Install Date">
            {moment(state.commissioningOrinstallDate).format(
              "DD MMM YYYY h:mm:ss A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {state.telephoneNo ? state.telephoneNo : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Fuel Type">
            {state.fuelType ? state.fuelType.name : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Make">
            {state.boilerMake ? state.boilerMake.name : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Type">
            {state.boilerType ? state.boilerType.name : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Pressure">
            {state.boilerPressure}
          </Descriptions.Item>

          <Descriptions.Item label="KW Rated to">
            {state.kWRatedTo}
          </Descriptions.Item>
          <Descriptions.Item label="Flow Temp">
            {state.flowTemp}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(state.createdAt).format('DD MMM YYYY h:mm:ss A')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(state.updatedAt).format('DD MMM YYYY h:mm:ss A')}
          </Descriptions.Item>
          <Descriptions.Item label="Comments" span={2}>
            {state.comments}
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      <ModalBodyClass isModalVisible={visible} />
    </div>
  )
}

export default React.memo(CreateContent)
