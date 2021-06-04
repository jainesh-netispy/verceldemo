import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import Login from 'src/views/login'

const LoginPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Login />
    </div>
  )
}
export default LoginPage
