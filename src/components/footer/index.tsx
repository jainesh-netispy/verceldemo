import React from 'react'
import moment from 'moment'
import CONFIG from '../../config'
import { Layout } from 'antd'

const { Footer } = Layout

const Footerhtml = () => {
  return (
    <Footer
      className={'footer'}
      style={{
        /*  color: "white", */
        /*   backgroundColor: "#001529",
        position: "absolute", */
        // bottom: "0",
        width: '100%',
        /* padding: "2em", */
        textAlign: 'center',
        /* marginTop: "50px", */
      }}
    >
      <p style={{ marginBottom: '0px' }}>
        &copy; {moment().format('YYYY')} {CONFIG.title}. All rights reserved.
      </p>
    </Footer>
  )
}

export default Footerhtml
