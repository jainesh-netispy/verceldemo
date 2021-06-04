import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import ManageFuelTypes from 'src/views/ManageFuelTypes'

const ManageFuelTypesPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ManageFuelTypes />
    </div>
  )
}
export default ManageFuelTypesPage
