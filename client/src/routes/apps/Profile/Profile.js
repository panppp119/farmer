import React from "react";

import ProfileForm from "components/forms/ProfileForm";

import "./Profile.scss";

class Profile extends React.Component {
  render() {
    return (
      <div className='profile'>
        <ProfileForm />
      </div>
    );
  }
}

export default Profile;
