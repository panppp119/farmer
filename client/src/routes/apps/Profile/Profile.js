import React from "react";

import ProfileForm from "components/forms/ProfileForm";

import "./Profile.scss";

class Profile extends React.Component {
  componentDidMount() {
    this.props.user.isEmpty() && this.props.loadUser();
    this.props.address.isEmpty() && this.props.loadAddress();
    this.props.farms.isEmpty() && this.props.loadFarms();
  }

  render() {
    return (
      <div className='profile'>
        <ProfileForm
          user={this.props.user}
          address={this.props.address}
          farms={this.props.farms}
          updateUser={this.props.updateUser}
          addAddress={this.props.addAddress}
          updateAddress={this.props.updateAddress}
          addFarms={this.props.addFarms}
          updateFarms={this.props.updateFarms}
          loadingUser={this.props.loadingUser}
          loadingAddress={this.props.loadingAddress}
          loadingFarms={this.props.loadingFarms}
        />
      </div>
    );
  }
}

export default Profile;
