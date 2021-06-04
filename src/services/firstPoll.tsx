import { LOCAL_STORAGE } from '../constants'
import { message } from 'antd'
import React from 'react'

const firstPollMessage = () => {
  // const [visible, setVisible] = useState<any>(true)
  const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
  const pollSubmit = localStorage.getItem('firstPoll')
  // console.log(pollSubmit);

  // const linkText=<Link to="/firstpoll">Click Here..</Link>;
  const linkText = <a href="/firstpoll">Click Here.</a>

  return (userInfo && userInfo.user && userInfo.user.firstPollSubmit) || pollSubmit
    ? ''
    : message.info({
        content: (
          <>
            Please submit a firstpoll and improve your profile. {linkText}{' '}
            {/* onClick={()=>setVisible(false)} */}
          </>
        ),
        duration: 5,
      })
}
export default firstPollMessage
