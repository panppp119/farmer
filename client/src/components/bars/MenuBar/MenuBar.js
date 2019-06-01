import React from "react";
import { Link } from "react-router-dom";
import { withTheme } from "@material-ui/core/styles";
import { List, Header } from "semantic-ui-react";
import {
  AccountCircle,
  Home,
  AccountBalanceWallet,
  PowerSettingsNew,
  ShoppingBasket,
  ListAlt
} from "@material-ui/icons";

import "./MenuBar.scss";

class MenuBar extends React.Component {
  signout = e => {
    e.preventDefault();

    this.props.toggleMenu(false);
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
              to='/'
              onClick={() => this.props.toggleMenu(false)}
            >
              <Home />
              <Header as='h4'>หน้าหลัก</Header>
            </List.Item>

            <List.Item
              as={Link}
              to='/profile'
              onClick={() => this.props.toggleMenu(false)}
            >
              <AccountCircle />
              <Header as='h4'>ข้อมูลส่วนตัว</Header>
            </List.Item>

            <List.Item
              as={Link}
              to='/wallet'
              onClick={() => this.props.toggleMenu(false)}
            >
              <AccountBalanceWallet />
              <Header as='h4'>บัญชีของฉัน</Header>
            </List.Item>

            <List.Item
              as={Link}
              to='/shop'
              onClick={() => this.props.toggleMenu(false)}
            >
              <ShoppingBasket />
              <Header as='h4'>ร้านค้า</Header>
            </List.Item>

            <List.Item
              as={Link}
              to='/farm'
              onClick={() => this.props.toggleMenu(false)}
            >
              <ListAlt />
              <Header as='h4'>ทะเบียนเกษตรกรรม</Header>
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
