import React from "react";
import Numeral from "numeral";
import { withTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Table } from "semantic-ui-react";

import "./MarketTable.scss";

class MarketTable extends React.Component {
  componentDidMount() {
    // this.props.market.isEmpty() && this.props.loadMarket()
  }

  add = e => {
    e.preventDefault();

    this.setState({ add: true });
  };

  update = e => {
    e.preventDefault();

    this.setState({ add: true });
  };

  delete = e => {
    e.preventDefault();

    this.setState({ add: true });
  };

  render() {
    // const { market } = this.props

    return (
      <div className='market-table'>
        <Table basic='very'>
          <Table.Body>
            <Table.Row>
              <Table.Cell>สินค้า 1</Table.Cell>
              <Table.Cell textAlign='right'>
                THB {Numeral(0).format("0,0.00")}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>สินค้า 2</Table.Cell>
              <Table.Cell textAlign='right'>
                THB {Numeral(0).format("0,0.00")}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>สินค้า 3</Table.Cell>
              <Table.Cell textAlign='right'>
                THB {Numeral(0).format("0,0.00")}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Button
          fullWidth
          color='primary'
          variant='contained'
          onClick={this.add}
        >
          เพิ่มสินค้า
        </Button>
      </div>
    );
  }
}

export default withTheme()(MarketTable);
