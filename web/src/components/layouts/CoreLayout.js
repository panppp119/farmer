import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Map } from "immutable";

import MainBar from "components/bars/MainBar";
import MenuBar from "components/bars/MenuBar";
import MainView from "components/views/MainView";
import { checkAuth, signout } from "actions/auth";

class CoreLayout extends React.Component {
  state = {
    menu: false
  };

  componentDidMount() {
    this.props.checkAuth();
  }

  toggleMenu = bool => {
    this.setState({ menu: bool });
  };

  render() {
    return (
      <div className='corelayout'>
        <MainBar
          toggleMenu={this.toggleMenu}
          menu={this.state.menu}
          auth={this.props.auth}
        />
        <MenuBar
          menu={this.state.menu}
          signout={this.props.signout}
          toggleMenu={this.toggleMenu}
        />

        <Helmet title='The Farming' />

        <MainView>{this.props.children}</MainView>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.getIn(["auth", "user"], Map())
});

const mapDispatchToProps = {
  checkAuth: () => checkAuth(),
  signout: () => signout()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreLayout);
