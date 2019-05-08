import React from "react";
import { Link } from "react-router-dom";
import { withTheme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { FormatAlignRight } from "@material-ui/icons";

import Image from "components/Image";

class MainBar extends React.Component {
  render() {
    return (
      <div className='main-bar'>
        <AppBar position='fixed' color='primary'>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Link className='logo' to='/' style={{ display: "flex" }}>
              <Image url={require("assets/logo/logo_w.png")} name='logo' />
              <Image
                url={require("assets/logo/title_w.png")}
                name='the farming'
                height='25px'
                margin={{ marginLeft: 8 }}
                addStyle={{ alignContent: "center" }}
              />
            </Link>

            <Button
              style={{ color: "#f8f8f8", minWidth: "auto" }}
              onClick={() => this.props.toggleMenu()}
            >
              <FormatAlignRight />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withTheme()(MainBar);
