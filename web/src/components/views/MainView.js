import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <div className='main-view' style={{ padding: 24, paddingTop: 80 }}>
        {this.props.children}
      </div>
    )
  }
}

export default Sidebar
