import React from "react";
import { Link } from "react-router-dom";
import { withTheme } from "@material-ui/core/styles";
import { List, Header } from "semantic-ui-react";
import {
  AccountCircle,
  AccountBalanceWallet,
  PowerSettingsNew
} from "@material-ui/icons";

import "./MenuBar.scss";

class MenuBar extends React.Component {
  signout = e => {
    e.preventDefault();

    this.props.toggleMenu();
    this.props.signout();
  };

  render() {
    const visible = this.props.menu;

    return (
      visible && (
        <div className='menu-bar'>
          <List>
            <List.Item
              as={Link}
              to='/profile'
              onClick={() => this.props.toggleMenu()}
            >
              <AccountCircle />
              <Header as='h4'>ข้อมูลส่วนตัว</Header>
            </List.Item>

            <List.Item
              as={Link}
              to='/wallet'
              onClick={() => this.props.toggleMenu()}
            >
              <AccountBalanceWallet />
              <Header as='h4'>กระเป๋าเงิน</Header>
            </List.Item>

            <List.Item as={Link} to='/sign_in' onClick={this.signout}>
              <PowerSettingsNew />
              <Header as='h4'>ออกจากระบบ</Header>
            </List.Item>
          </List>
        </div>
      )
    );
  }
}

export default withTheme()(MenuBar);
