import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button } from 'antd'
import GreetUser from './GreetUser'
import WouldYouLikeToSignIn from './WouldYouLikeToSignIn'

import 'antd/dist/antd.css'
import './styles.css'

const { useState } = React

function App() {
  const [
    wouldYouLikeToSignInModalVisible,
    setWouldYouLikeToSignInModalVisible,
  ] = useState(false)
  const [greetUserVisible, setGreetUserVisible] = useState(false)
  const [username, setUsername] = useState()
  const [{ actionCallback }, setActionCallback] = useState({
    actionCallback: (username: string) => {},
  })

  const openWouldYouLikeToSignInModalBefore = fn => (...args) => {
    setWouldYouLikeToSignInModalVisible(true)
    setActionCallback({
      actionCallback: (username: string) => {
        fn(username)(...args)
      },
    })
  }

  const openGreetUser = (username: string | undefined) => {
    setUsername(username)
    setGreetUserVisible(true)
  }

  return (
    <div className="App">
      <br />
      <Button type="primary" onClick={_event => openGreetUser(undefined)}>
        Greet User
      </Button>

      <br />
      <br />

      <Button
        type="primary"
        onClick={openWouldYouLikeToSignInModalBefore(
          (username: string | undefined) => _event => openGreetUser(username)
        )}
      >
        Greet User after Signing In
      </Button>

      <br />
      <br />

      <Button onClick={() => setUsername(undefined)}>Clear username</Button>

      <GreetUser
        visible={greetUserVisible}
        setVisible={setGreetUserVisible}
        username={username}
      />

      <WouldYouLikeToSignIn
        visible={wouldYouLikeToSignInModalVisible}
        setVisible={visible => setWouldYouLikeToSignInModalVisible(visible)}
        actionCallback={actionCallback}
        username={username}
      />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
