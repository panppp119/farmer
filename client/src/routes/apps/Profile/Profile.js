import React from "react";

import ProfileForm from "components/forms/ProfileForm";

import "./Profile.scss";

class Profile extends React.Component {
  componentDidMount () {
    this.props.user.isEmpty() && this.props.loadUser()
  }

  render() {
    return (
      <div className='profile'>
        <ProfileForm
          user={this.props.user}
          address={this.props.address}
          updateUser={this.props.updateUser}
          addAddress={this.props.addAddress}
          updateAddress={this.props.updateAddress}
          loadingUser={this.props.loadingUser}
          loadingAddress={this.props.loadingAddress}
        />
      </div>
    );
  }
}

export default Profile;
