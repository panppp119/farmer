import React from "react";

import Image from "components/Image";
import SignInForm from "components/forms/SignInForm";

class SignIn extends React.Component {
  render() {
    const { signin, loadingAuth } = this.props;

    return (
      <div className='signin' style={{ textAlign: "center" }}>
        <Image
          url={require("assets/logo/logo_title.png")}
          name='logo'
          height='250px'
        />

        <SignInForm
          signin={signin}
          loading={loadingAuth}
        />
      </div>
    );
  }
}

export default SignIn;
