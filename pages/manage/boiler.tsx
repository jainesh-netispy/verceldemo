import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import ManageBoiler from 'src/views/ManageBoiler'

const ManageBoilerPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ManageBoiler />
    </div>
  )
}
export default ManageBoilerPage
