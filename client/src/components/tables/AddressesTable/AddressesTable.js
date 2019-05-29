import React from "react";
import { Map } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Grid, Label, Modal } from "semantic-ui-react";
import { NearMe } from "@material-ui/icons";

import GetForm from "components/forms/GetForm";
import DoneForm from "components/forms/DoneForm";

import "./AddressesTable.scss";

class AddressesTable extends React.Component {
  state = {
    get: false,
    done: false,
    modal: {}
  };

  componentDidMount() {
    this.props.addresses.isEmpty() && this.props.loadAddresses();
    this.props.products.isEmpty() && this.props.loadProducts();
  }

  get = address => e => {
    this.setState({ get: true, modal: { address } });
  };

  done = (address, product) => e => {
    this.setState({ done: true, modal: { address, product } });
  };

  close = e => {
    this.setState({ get: false, done: false, modal: {} });
  };

  modal() {
    const { get, done, modal } = this.state;
    const address = modal.address || Map();
    const product = modal.product || Map();

    return (
      <Modal open={get || done} onClose={this.close} closeIcon>
        <Modal.Header>{get ? "รับของ" : `ปิดการขาย`}</Modal.Header>
        <Modal.Content>
          {!product.isEmpty() ? (
            <DoneForm
              driver={this.props.user}
              market={this.props.market}
              user_id={address.get("user_id")}
              product={product}
              updateProduct={this.props.updateProduct}
              addTransaction={this.props.addTransaction}
              close={this.close}
            />
          ) : (
            <GetForm
              driver={this.props.user}
              market={this.props.market}
              user_id={address.get("user_id")}
              addProduct={this.props.addProduct}
              close={this.close}
            />
          )}
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    const { addresses, products, market } = this.props;

    return (
      <div className='addresses-table'>
        {this.modal()}

        <Grid>
          {!addresses.isEmpty() ? (
            addresses.map((address, i) => {
              return (
                <Grid.Row key={i}>
                  <Grid.Column width={8} textAlign='left'>
                    <a
                      href={`https://map.google.com/?q=${address.get(
                        "lat"
                      )},${address.get("lng")}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <NearMe /> {address.get("name") || "Google Map"}
                    </a>
                  </Grid.Column>

                  <Grid.Column width={8} textAlign='right'>
                    {!products.isEmpty() &&
                      products
                        .filter(
                          p => p.get("user_id") === address.get("user_id")
                        )
                        .map((product, pi) => {
                          const product_name =
                            market
                              .find(
                                m => m.get("id") === product.get("product_id")
                              )
                              .get("name") || Map();

                          return (
                            <Grid columns={2} key={pi}>
                              <Grid.Column>
                                <Label key={pi}>
                                  {product_name} - {product.get("status")}
                                </Label>
                              </Grid.Column>

                              <Grid.Column>
                                <Button
                                  key={pi}
                                  color='primary'
                                  variant='contained'
                                  onClick={this.done(address, product)}
                                  style={{
                                    display:
                                      product.get("status") === "ปิดการขาย" &&
                                      "none"
                                  }}
                                >
                                  เสร็จสิ้น
                                </Button>
                              </Grid.Column>
                            </Grid>
                          );
                        })}

                    <Button
                      color='secondary'
                      variant='contained'
                      onClick={this.get(address)}
                      style={{ marginTop: 16 }}
                    >
                      รับของ
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              );
            })
          ) : (
            <Grid.Row>
              <p>ไม่มีจุดหมายปลายทาง</p>
            </Grid.Row>
          )}
        </Grid>
      </div>
    );
  }
}

export default withTheme()(AddressesTable);
