import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import MainBar from "components/bars/MainBar";
import MenuBar from "components/bars/MenuBar";
import MainView from "components/views/MainView";
import { checkAuth } from "actions/auth";

class CoreLayout extends React.Component {
  state = {
    menu: false
  };

  componentDidMount() {
    this.props.checkAuth();
  }

  toggleMenu = () => {
    this.setState({ menu: !this.state.menu });
  };

  render() {
    return (
      <div className='corelayout'>
        <MainBar toggleMenu={this.toggleMenu} />
        <MenuBar menu={this.state.menu} />

        <Helmet title='The Farming' />

        <MainView>{this.props.children}</MainView>
      </div>
    );
  }
}

const mapDispatchToProps = {
  checkAuth: () => checkAuth()
};

export default connect(
  null,
  mapDispatchToProps
)(CoreLayout);
