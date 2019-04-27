import * as React from 'react'
import WouldYouLikeToSignInModal from './WouldYouLikeToSignInModal'
import SignInModal from '../SignInModal'

const { useState, useEffect } = React

type Props = {
  visible: boolean
  setVisible: (visible: boolean) => void
  actionCallback: (username?: string) => void
  username: string | undefined
}

export default function WouldYouLikeToSignIn({
  visible,
  setVisible,
  actionCallback,
  username,
}: Props) {
  const [signInModalVisible, setSignInModalVisible] = useState(false)

  const shouldOpenModal = getShouldOpenModal(username)

  useEffect(() => {
    if (visible && !shouldOpenModal) {
      setVisible(false)
      actionCallback(username)
    }
  }, [visible])

  return (
    shouldOpenModal && (
      <>
        <WouldYouLikeToSignInModal
          visible={visible}
          onCancel={() => {
            setVisible(false)
          }}
          onYes={dontShowMessageAgain => {
            setVisible(false)
            setSignInModalVisible(true)
          }}
          onNo={dontShowMessageAgain => {
            setVisible(false)
            actionCallback()
          }}
        />

        <SignInModal
          visible={signInModalVisible}
          onCancel={() => {
            setSignInModalVisible(false)
          }}
          onContinue={(username: string) => {
            setSignInModalVisible(false)
            actionCallback(username)
          }}
        />
      </>
    )
  )
}

function getShouldOpenModal(username: string | undefined): boolean {
  return !Boolean(username)
}
