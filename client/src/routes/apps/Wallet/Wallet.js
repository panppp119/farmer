import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import WalletForm from "components/forms/WalletForm";

import "./Wallet.scss";

class Wallet extends React.Component {
  state = {
    add: false
  };

  componentDidMount() {
    this.props.wallet.isEmpty() && this.props.loadWallet();
  }

  add = e => {
    e.preventDefault();

    this.setState({ add: true });
  };

  render() {
    const { add } = this.state;
    const { wallet } = this.props;

    return (
      <div className='wallet'>
        {wallet.isEmpty() && !add ? (
          <Button
            fullWidth
            id='add-button'
            variant='contained'
            style={{ marginTop: 16 }}
            onClick={this.add}
          >
            เพิ่มบัญชี
          </Button>
        ) : (
          <WalletForm
            user={this.props.user}
            wallet={wallet}
            updateWallet={this.props.updateWallet}
            addWallet={this.props.addWallet}
            loadingUser={this.props.loadingUser}
            loadingWallet={this.props.loadingWallet}
          />
        )}
      </div>
    );
  }
}

export default withTheme()(Wallet);
