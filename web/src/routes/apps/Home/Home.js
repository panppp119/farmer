import React from 'react'

import Image from 'components/Image'
import SignInForm from 'components/forms/SignInForm'

class Home extends React.Component {
  componentDidMount () {
    this.props.checkAuth()
  }

  changeForm = (name) => {
    this.setState({ form: name })
  }

  render () {
    const { signin, loadingAuth, verifyCode } = this.props

    return (
      <div className="home" style={{ textAlign: 'center' }}>
        <Image url={require('assets/logo/logo_title.png')} name='logo' height='250px' />

        <SignInForm
          changeForm={this.changeForm}
          signin={signin}
          loading={loadingAuth}
          verifyCode={verifyCode}
        />
      </div>
    )
  }
}

export default Home
