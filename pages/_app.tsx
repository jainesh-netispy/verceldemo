import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { wrapper } from 'src/redux'
import Layout from 'src/components/Layout'
import GlobalBaseStyle from 'src/styles/GlobalBaseStyle'

import 'src/i18n'

import 'antd/dist/antd.css'
// public styles
import 'public/styles/global.scss/'
import 'public/styles/variables.scss'
import 'public/styles/mixins.scss'
// Login styles
import 'src/components/loginHeader/style.scss'
import 'src/components/loginHeader/style.scss'
import 'src/components/loginFooter/style.scss'
import 'src/views/login/style1.scss'
// Login styles
import 'src/components/exception/style.scss'
// EditProfile styles
import 'src/views/EditProfile/style1.scss'
// footer styles
import 'src/components/footer/style.scss'
// header2 styles
import 'src/components/header2/style.scss'
// topbar styles
import 'src/components/topbar/style.scss'
// table styles
import 'src/components/table/style.scss'
// ManageBoilerBrands styles
import 'src/views/ManageBoilerBrands/style1.scss'
// ManageBoilerModels styles
import 'src/views/ManageBoilerModels/style1.scss'
// ManageBoilerBrands styles
import 'src/views/ManageBoilerTypes/style1.scss'
const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <GlobalBaseStyle />
    <Component {...pageProps} />
  </Layout>
)

export default wrapper.withRedux(WrappedApp)
