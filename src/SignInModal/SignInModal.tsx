import * as React from 'react'
import { Modal, Icon, Input, Button } from 'antd'

const { useState } = React

type Props = {
  visible: boolean
  onCancel: () => void
  onContinue: (username: string) => void
}

export default function SignInModal({ visible, onCancel, onContinue }: Props) {
  const [username, setUsername] = useState()

  return (
    <Modal title="Sign In" visible={visible} footer={null} onCancel={onCancel}>
      <div>
        <Input
          placeholder="username"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>

      <br />

      <Button
        type="primary"
        onClick={() => {
          onContinue(username)
          setUsername(undefined)
        }}
      >
        Continue
      </Button>
    </Modal>
  )
}
