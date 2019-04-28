/** @jsx jsx */

import * as React from 'react'
import { Modal, Button, Checkbox } from 'antd'
import { jsx, css } from '@emotion/core'

const { useState } = React

type Props = {
  visible: boolean
  onCancel: () => void
  onNo: (dontShowMessageAgain: boolean) => void
  onYes: (dontShowMessageAgain: boolean) => void
}

export default function WouldYouLikeToSignInModal({
  visible,
  onCancel,
  onNo,
  onYes,
}: Props) {
  const [dontShowMessageAgain, setDontShowMessageAgain] = useState(false)

  return (
    <Modal
      title="Would You Like To Sign In?"
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      <p>Would you like to sign in before continuing?</p>

      <div
        css={css`
          display: flex;
          justify-content: space-evenly;
        `}
      >
        <Button onClick={() => onNo(dontShowMessageAgain)}>
          No, continue without signing in
        </Button>

        <Button type="primary" onClick={() => onYes(dontShowMessageAgain)}>
          Yes, Sign In
        </Button>
      </div>

      <br />

      <div
        css={css`
          text-align: center;
        `}
      >
        <Checkbox
          name="dontShowMessageAgain"
          value={dontShowMessageAgain}
          onChange={event => {
            setDontShowMessageAgain(event.target.checked)
          }}
        >
          Don't show this message again
        </Checkbox>
      </div>
    </Modal>
  )
}
