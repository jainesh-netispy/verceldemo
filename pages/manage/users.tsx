import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import ManageUser from 'src/views/ManageUser'

const ManageUserPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ManageUser />
    </div>
  )
}
export default ManageUserPage
