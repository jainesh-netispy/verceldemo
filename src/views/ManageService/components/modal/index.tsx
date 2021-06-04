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
  onCancel: () => void
}

const { TextArea } = Input
const initialState: any = {
  confirmLoading: false,
  name: '',
  shortDescription: '',
}

const CreateContent: React.FC<Props> = function ({ visible, onCancel, rowData }) {
  console.log('rowData', rowData)
  const [form] = Form.useForm()
  const [state, setState] = useSetState(initialState)
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
      <Modal visible={visible} onCancel={onCancel} forceRender centered width={'60%'} footer="">
        <Descriptions title="Boiler Details" bordered column={2}>
          <Descriptions.Item label="Serial No">
            {state.boilerInstallationId && state.boilerInstallationId.boilerSerialNumber
              ? state.boilerInstallationId.boilerSerialNumber
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Model">
            {state.boilerInstallationId && state.boilerInstallationId.boilerModelName
              ? state.boilerInstallationId.boilerModelName
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Commissioned By">
            {state.boilerInstallationId && state.boilerInstallationId.commissionedBy
              ? state.boilerInstallationId.commissionedBy
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Postcode">
            {state.boilerInstallationId && state.boilerInstallationId.postCode
              ? state.boilerInstallationId.postCode
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Gas Safe No">
            {state.boilerInstallationId && state.boilerInstallationId.gasSafeNumber
              ? state.boilerInstallationId.gasSafeNumber
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Commissioning / Install Date">
            {moment(state.commissioningOrinstallDate).format('DD MMM YYYY h:mm:ss A')}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {state.boilerInstallationId && state.boilerInstallationId.telephoneNo
              ? state.boilerInstallationId.telephoneNo
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Fuel Type">
            {state.boilerInstallationId && state.boilerInstallationId.fuelTypeName
              ? state.boilerInstallationId.fuelTypeName
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Make">-</Descriptions.Item>
          <Descriptions.Item label="Boiler Type">
            {state.boilerInstallationId && state.boilerInstallationId.boilerTypeModelName
              ? state.boilerInstallationId.boilerTypeModelName
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Pressure">
            {state.boilerInstallationId ? state.boilerInstallationId.boilerPressure : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="KW Rated to">
            {state.boilerInstallationId ? state.boilerInstallationId.kWRatedTo : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Flow Temp">
            {state.boilerInstallationId ? state.boilerInstallationId.flowTemp : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {state.boilerInstallationId && state.boilerInstallationId.createdAt
              ? moment(state.boilerInstallationId.createdAt).format('DD MMM YYYY h:mm:ss A')
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {state.boilerInstallationId && state.boilerInstallationId.updatedAt
              ? moment(state.boilerInstallationId.updatedAt).format('DD MMM YYYY h:mm:ss A')
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Comments" span={2}>
            {state.boilerInstallationId && state.boilerInstallationId.comments
              ? state.boilerInstallationId.comments
              : '-'}
          </Descriptions.Item>
        </Descriptions>
        <div className="mt-3"></div>

        <Descriptions title="Service Info" bordered column={2}>
          <Descriptions.Item label="Postcode">{state.postCode}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {moment(state.date).format('DD MMM YYYY h:mm:ss A')}
          </Descriptions.Item>
          <Descriptions.Item label="Service Type">{state.serviceType}</Descriptions.Item>
          <Descriptions.Item label="Engineer Name">
            {state.engineerName ? state.engineerName.firstName : ''}{' '}
            {state.engineerName ? state.engineerName.lastName : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Company Name">{state.companyName}</Descriptions.Item>
          <Descriptions.Item label="Gas Safe No">
            {state.gasSafeRegistration ? state.gasSafeRegistration : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Licence No">
            {state.licenseNo ? state.licenseNo : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Gas Rate (m3/h or f3/h)">
            {state.gasRate ? state.gasRate : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Boiler Pressure (BAR)">
            {state.boilerPressure ? state.boilerPressure : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Max Rate CO">
            {state.maxrate ? `${state.maxrate.co} PPM` : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Max Rate CO2">
            {state.maxrate ? `${state.maxrate.co2} %` : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Max Rate CO/CO2">
            {state.maxrate ? `${state.maxrate.coOrCo2} RATIO` : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Min Rate CO">
            {state.minrate ? `${state.minrate.co} PPM` : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Min Rate CO2">
            {state.minrate ? `${state.minrate.co2} %` : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Min Rate CO/CO2">
            {state.minrate ? `${state.minrate.coOrCo2} RATIO` : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Flue Integrity checked">
            {state.flueIntegrityChecked === "Y" ? "Yes" : "No"}
          </Descriptions.Item>

          <Descriptions.Item label="Were parts fitted">
            {state.werePartsFitted === "N" ? "No" : "Yes"}
          </Descriptions.Item>

          <Descriptions.Item label="Inhibitor Checked">
            {state.inhibitorChecked ? "Yes" : "No"}
          </Descriptions.Item>

          <Descriptions.Item label="Comments" span={3}>
            {state.comments ? state.comments : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Parts Fitted Note" span={3}>
            {state.werePartsFittedNote ? state.werePartsFittedNote : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <ModalBodyClass isModalVisible={visible} />
    </div>
  )
}

export default React.memo(CreateContent)
