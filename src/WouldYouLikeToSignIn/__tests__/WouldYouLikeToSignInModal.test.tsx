import * as React from 'react'
import {
  render,
  fireEvent,
  getByText,
  getByLabelText,
} from 'react-testing-library'

import WouldYouLikeToSignInModal from '../WouldYouLikeToSignInModal'

describe('WouldYouLikeToSignInModal', () => {
  const noop = () => {}

  it('should not render anything when visible={false}', () => {
    render(
      <WouldYouLikeToSignInModal
        visible={false}
        onCancel={noop}
        onNo={noop}
        onYes={noop}
      />
    )

    expect(document.body.textContent).toBe('')
  })

  it('should work as expected', () => {
    const onCancel = jest.fn()
    const onNo = jest.fn()
    const onYes = jest.fn()
    render(
      <WouldYouLikeToSignInModal
        visible
        onCancel={onCancel}
        onNo={onNo}
        onYes={onYes}
      />
    )

    expect(document.body.textContent).toContain(
      'Would you like to sign in before continuing?'
    )

    expect(onNo).not.toHaveBeenCalled()
    fireEvent.click(getByText(document.body, /No/i))
    expect(onNo).toHaveBeenLastCalledWith(false)

    expect(onYes).not.toHaveBeenCalled()
    fireEvent.click(getByText(document.body, /Yes/i))
    expect(onYes).toHaveBeenLastCalledWith(false)

    // Now after ticking the "Don't show this message again" checkbox

    fireEvent.click(
      getByLabelText(document.body, /Don't show this message again/i),
      { target: { value: true } }
    )

    fireEvent.click(getByText(document.body, /No/i))
    expect(onNo).toHaveBeenLastCalledWith(true)

    fireEvent.click(getByText(document.body, /Yes/i))
    expect(onYes).toHaveBeenLastCalledWith(true)

    // Closing

    expect(onCancel).not.toHaveBeenCalled()
    fireEvent.click(getByLabelText(document.body, 'Close'))
    expect(onCancel).toHaveBeenCalled()
  })
})
