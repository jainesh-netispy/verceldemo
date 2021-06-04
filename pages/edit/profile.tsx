import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import EditProfile from 'src/views/EditProfile'

const EditProfilePage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <EditProfile />
    </div>
  )
}
export default EditProfilePage
