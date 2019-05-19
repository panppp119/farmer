import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Map } from "immutable";

import MainBar from "components/bars/MainBar";
import MenuBar from "components/bars/MenuBar";
import MainView from "components/views/MainView";
import FlashMessage from 'components/FlashMessage'

import { signout, checkSession } from "actions/auth";

class CoreLayout extends React.Component {
  static defaultProps = {
    user: Map()
  }
  
  state = {
    menu: false
  };

  componentDidMount  () {
    if (this.props.user.isEmpty()) {
      this.props.checkSession()
    }
  }

  toggleMenu = bool => {
    this.setState({ menu: bool });
  };

  render() {
    const { flash_message } = this.props

    return (
      <div className='corelayout'>
        <MainBar
          toggleMenu={this.toggleMenu}
          menu={this.state.menu}
          auth={this.props.user}
        />
        <MenuBar
          menu={this.state.menu}
          signout={this.props.signout}
          toggleMenu={this.toggleMenu}
        />

        <Helmet title='The Farming' />

        <MainView>
          <FlashMessage
            type={flash_message.get('type')}
            content={flash_message.get('text')}
            mount={!flash_message.isEmpty()}
          />

          {this.props.children}
        </MainView>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.getIn(["user", "data"], Map()),
  flash_message: state.getIn(["ui", "flash_message"], Map())
});

const mapDispatchToProps = {
  signout: () => signout(),
  checkSession: () => checkSession()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreLayout);
