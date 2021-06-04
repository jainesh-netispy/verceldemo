import React from 'react'
import moment from 'moment'
import CONFIG from '../../config'
import { Layout } from 'antd'

const { Footer } = Layout

const FooterLogin = () => {
  return (
    <Footer
      className="footer myBoiler-color"
      style={{
        // color: "white",
        backgroundColor: '#f2f4f8',
        position: 'absolute',
        // bottom: "0",
        width: '100%',
        padding: '2em',
        textAlign: 'center',
        marginTop: '50px',
      }}
    >
      <p style={{ marginBottom: '0px' }}>
        &copy; {moment().format('YYYY')} {CONFIG.title}. All rights reserved.
      </p>
    </Footer>
  )
}

export default FooterLogin
