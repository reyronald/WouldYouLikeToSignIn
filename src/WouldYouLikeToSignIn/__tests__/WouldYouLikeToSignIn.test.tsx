import * as React from 'react'
import {
  render,
  fireEvent,
  getByLabelText,
  getByText,
  getByPlaceholderText,
  getAllByLabelText,
} from 'react-testing-library'

import WouldYouLikeToSignIn from '..'

jest.useFakeTimers()

describe('WouldYouLikeToSignIn', () => {
  const noop = () => {}

  it('should not render anything if visible={false}', () => {
    render(
      <WouldYouLikeToSignIn
        visible={false}
        setVisible={noop}
        actionCallback={noop}
        username={undefined}
      />
    )

    expect(document.body.textContent).toBe('')
  })

  it('should immediately execute actionCallback if username is already set and not render anything', () => {
    const actionCallback = jest.fn()
    const setVisible = jest.fn()
    render(
      <WouldYouLikeToSignIn
        visible
        setVisible={setVisible}
        actionCallback={actionCallback}
        username={'Ronald'}
      />
    )

    expect(document.body.textContent).toBe('')
    expect(setVisible).toHaveBeenLastCalledWith(false)
    expect(actionCallback).toHaveBeenLastCalledWith('Ronald')
  })

  it('should work as expected', async () => {
    const setVisible = jest.fn()
    const actionCallback = jest.fn()
    const { rerender } = render(
      <WouldYouLikeToSignIn
        visible
        setVisible={setVisible}
        actionCallback={actionCallback}
        username={undefined}
      />
    )

    expect(document.body.textContent).not.toBe('')
    expect(document.body.textContent).toContain(
      'Would you like to sign in before continuing?'
    )
    expect(() => getByPlaceholderText(document.body, 'username')).toThrow()
    expect(setVisible).not.toHaveBeenCalled()
    expect(actionCallback).not.toHaveBeenCalled()

    fireEvent.click(getByLabelText(document.body, 'Close'))
    expect(setVisible).toHaveBeenCalledTimes(1)
    expect(setVisible).toHaveBeenLastCalledWith(false)
    expect(actionCallback).not.toHaveBeenCalled()

    fireEvent.click(getByText(document.body, /No/i))
    expect(setVisible).toHaveBeenCalledTimes(2)
    expect(setVisible).toHaveBeenLastCalledWith(false)
    expect(actionCallback).toHaveBeenCalledTimes(1)
    expect(actionCallback).toHaveBeenCalled()

    expect(() => getByPlaceholderText(document.body, 'username')).toThrow()
    fireEvent.click(getByText(document.body, /Yes/i))
    rerender(
      <WouldYouLikeToSignIn
        visible={false}
        setVisible={setVisible}
        actionCallback={actionCallback}
        username={undefined}
      />
    )
    jest.runAllTimers()
    expect(setVisible).toHaveBeenCalledTimes(3)
    expect(setVisible).toHaveBeenLastCalledWith(false)
    expect(() => getByPlaceholderText(document.body, 'username')).not.toThrow()

    fireEvent.change(getByPlaceholderText(document.body, 'username'), {
      target: { value: 'Ronald' },
    })
    fireEvent.click(getByText(document.body, 'Continue'))
    expect(actionCallback).toHaveBeenCalledTimes(2)
    expect(actionCallback).toHaveBeenLastCalledWith('Ronald')
  })

  it('should close SignInModal', async () => {
    render(
      <WouldYouLikeToSignIn
        visible
        setVisible={noop}
        actionCallback={noop}
        username={undefined}
      />
    )

    fireEvent.click(getByText(document.body, /Yes/i))

    getAllByLabelText(document.body, 'Close').forEach(b => fireEvent.click(b))
  })
})
