import * as React from 'react'
import { Modal } from 'antd'

type Props = {
  visible: boolean
  setVisible: (visible: boolean) => void
  username: string
}

GreetUser.defaultProps = {
  username: 'anonymous',
}

export default function GreetUser({ visible, setVisible, username }: Props) {
  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
    >
      Hello {username} !
    </Modal>
  )
}
