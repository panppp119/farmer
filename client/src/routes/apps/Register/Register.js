import React from "react";

import RegisterForm from "components/forms/RegisterForm";

class Register extends React.Component {
  render() {
    const { signup, loadingAuth } = this.props;

    return (
      <div className='home' style={{ textAlign: "center" }}>
        <RegisterForm
          signup={signup}
          loading={loadingAuth}
        />
      </div>
    );
  }
}

export default Register;
