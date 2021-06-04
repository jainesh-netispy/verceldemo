import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import ManageBoilerModels from 'src/views/ManageBoilerModels'

const ManageBoilerModelsPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ManageBoilerModels />
    </div>
  )
}
export default ManageBoilerModelsPage
