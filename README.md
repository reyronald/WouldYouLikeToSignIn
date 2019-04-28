# "Would you like to sign in before proceeding?"

Open in CodeSandbox: https://codesandbox.io/s/github/reyronald/WouldYouLikeToSignIn

The `WouldYouLikeToSignIn` component provides the funcionality of displaying one or two modals that ask if the user wants to sign in and then show a sign in form before proceeding to execute any kind of action provided in the `actionCallback` prop.

The idea is to provide the easiest way of intercepting any kind of action with this set of prompts from any component when necessary. The Signin In case is just used as an illustrative example, but the same technical approach can be used for any sequence of modals.

![would you like to sign in](https://user-images.githubusercontent.com/7514993/56846072-50b70480-6898-11e9-9eda-5fe4cfe3b766.gif)

### TODO

1. Implement "Don't show message again" functionality with local storage
