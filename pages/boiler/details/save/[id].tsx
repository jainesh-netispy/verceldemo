import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import AddBoiler from 'src/views/ManageBoiler/AddBoiler'

const AddBoilerPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <AddBoiler />
    </div>
  )
}
export default AddBoilerPage
