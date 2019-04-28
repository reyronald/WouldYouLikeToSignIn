import * as React from 'react'
import {
  render,
  fireEvent,
  getByText,
  getByPlaceholderText,
  getByLabelText,
} from 'react-testing-library'

import SignInModal from '..'

describe('SignInModal', () => {
  const noop = () => {}

  it('should not render anything when visible={false}', () => {
    render(<SignInModal visible={false} onCancel={noop} onContinue={noop} />)

    expect(document.body.textContent).toBe('')
  })

  it('should work as expected', () => {
    const onContinue = jest.fn()
    const onCancel = jest.fn()
    render(<SignInModal visible onCancel={onCancel} onContinue={onContinue} />)

    fireEvent.click(getByText(document.body, /Continue/i))

    expect(onContinue).toHaveBeenCalledTimes(1)
    expect(onContinue).toHaveBeenLastCalledWith(undefined)

    fireEvent.change(getByPlaceholderText(document.body, 'username'), {
      target: { value: 'Ronald' },
    })

    fireEvent.click(getByText(document.body, /Continue/i))

    expect(onContinue).toHaveBeenCalledTimes(2)
    expect(onContinue).toHaveBeenLastCalledWith('Ronald')

    fireEvent.click(getByText(document.body, /Continue/i))
    expect(onContinue).toHaveBeenCalledTimes(3)
    expect(onContinue).toHaveBeenLastCalledWith(undefined)

    expect(onCancel).toHaveBeenCalledTimes(0)

    fireEvent.click(getByLabelText(document.body, 'Close'))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
