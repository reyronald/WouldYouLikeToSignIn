import * as React from 'react'
import {
  render,
  fireEvent,
  getByText,
  getByLabelText,
} from 'react-testing-library'

import GreetUser from '..'

describe('GreetUser', () => {
  const noop = () => {}

  it('should be empty when visible={false}', () => {
    render(<GreetUser visible={false} setVisible={noop} username={undefined} />)

    expect(document.body.textContent).not.toContain('Hello')
    expect(document.body.textContent).not.toContain('Hello anonymous !')
  })

  it('should render with default username', () => {
    render(<GreetUser visible setVisible={noop} username={undefined} />)

    expect(document.body.textContent).toContain('Hello')
    expect(document.body.textContent).toContain('Hello anonymous !')
  })

  it('should render with given username', () => {
    render(<GreetUser visible setVisible={noop} username={'Ronald'} />)

    expect(document.body.textContent).toContain('Hello')
    expect(document.body.textContent).toContain('Hello Ronald !')
  })

  it('should call setVisible(false) when buttons are clicked', () => {
    const setVisible = jest.fn()
    render(<GreetUser visible setVisible={setVisible} username={'Ronald'} />)

    expect(setVisible).not.toHaveBeenCalled()

    fireEvent.click(getByText(document.body, /Ok/i))

    expect(setVisible).toHaveBeenCalledTimes(1)
    expect(setVisible).toHaveBeenLastCalledWith(false)

    fireEvent.click(getByText(document.body, /Cancel/i))

    expect(setVisible).toHaveBeenCalledTimes(2)
    expect(setVisible).toHaveBeenLastCalledWith(false)

    fireEvent.click(getByLabelText(document.body, 'Close'))

    expect(setVisible).toHaveBeenCalledTimes(3)
    expect(setVisible).toHaveBeenLastCalledWith(false)
  })
})
