import React from "react";

import "./MainView.scss";

class MainView extends React.Component {
  render() {
    return <div className='main-view'>{this.props.children}</div>;
  }
}

export default MainView;
