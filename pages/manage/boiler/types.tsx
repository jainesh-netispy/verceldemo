import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import ManageBoilerTypes from 'src/views/ManageBoilerTypes'

const ManageBoilerTypesPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ManageBoilerTypes />
    </div>
  )
}
export default ManageBoilerTypesPage
