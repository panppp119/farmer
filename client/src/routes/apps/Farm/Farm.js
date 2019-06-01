import React from "react";

import FarmForm from "components/forms/FarmForm";

import "./Farm.scss";

class Farm extends React.Component {
  componentDidMount() {
    this.props.farms.isEmpty() && this.props.loadFarms();
  }

  render() {
    return (
      <div className='farm'>
        <FarmForm
          user={this.props.user}
          farms={this.props.farms}
          add={this.props.add}
          update={this.props.update}
          loading={this.props.loadingFarms}
        />
      </div>
    );
  }
}

export default Farm;
