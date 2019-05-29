import React from "react";
import Numeral from "numeral";
import { List, Map } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Grid } from "semantic-ui-react";

import "./MarketTable.scss";

class MarketTable extends React.Component {
  static defaultProps = {
    user: Map()
  };

  state = {
    index: null,
    name: null,
    market_attributes:
      (!this.props.market.isEmpty() && this.props.market.toJS()) || []
  };

  componentDidMount() {
    this.props.market.isEmpty() && this.props.loadMarket();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.market.isEmpty() && prevProps.market !== this.props.market) {
      this.setState({ market_attributes: this.props.market.toJS() });
    }

    if (!prevProps.market.isEmpty() && prevProps.market !== this.props.market) {
      this.setState({ market_attributes: this.props.market.toJS() });
    }
  }

  add = e => {
    e.preventDefault();

    this.setState(prevState => ({
      market_attributes: [
        ...prevState.market_attributes,
        {
          name: "สินค้า",
          amount: 0
        }
      ]
    }));
  };

  update = e => {
    e.preventDefault();

    this.setState({ add: true });
  };

  save = e => {
    e.preventDefault();

    const { market_attributes } = this.state;

    if (market_attributes.filter(market => market.id).length > 0) {
      this.props.update(market_attributes.filter(market => market.id));
    }

    if (market_attributes.filter(market => !market.id).length > 0) {
      this.props.save(market_attributes.filter(market => !market.id));
    }

    this.setState({ index: null, name: null });
  };

  remove = i => e => {
    e.preventDefault();

    const market = this.state.market_attributes;

    if (window.confirm("ยืนยันที่จะลบใช่หรือไม่?")) {
      if (market[i].id) {
        this.props.delete(market[i].id);
      }

      market.splice(i, 1);
      this.setState({ market_attributes: market });
    }
  };

  handleChange = (name, i) => e => {
    const value = e.target.value;
    const market = this.state.market_attributes;

    market[i][name] = value;
    this.setState({ market_attributes: market });
  };

  handleDblClick = (name, i) => e => {
    e.preventDefault();

    this.setState({ index: i, name });
  };

  render() {
    const { market_attributes, index, name } = this.state;
    const { user } = this.props;

    const roles = (!user.isEmpty() && user.get("roles")) || List();
    var editable = roles.includes("admin");

    return (
      <div className='market-table'>
        <Grid>
          {market_attributes.map((item, i) => {
            return (
              <Grid.Row style={{ padding: 0 }} key={i}>
                <Grid.Column
                  width={editable ? 9 : 10}
                  textAlign='left'
                  verticalAlign='middle'
                >
                  {editable && index === i && name === "name" ? (
                    <TextField
                      fullWidth
                      margin='normal'
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={item.name}
                      style={{ margin: 0 }}
                      onChange={this.handleChange("name", i)}
                    />
                  ) : (
                    <p onDoubleClick={this.handleDblClick("name", i)}>
                      {item.name}
                    </p>
                  )}
                </Grid.Column>

                <Grid.Column
                  width={editable ? 5 : 6}
                  textAlign='right'
                  verticalAlign='middle'
                >
                  {editable && index === i && name === "amount" ? (
                    <TextField
                      fullWidth
                      type='number'
                      margin='normal'
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={item.amount}
                      style={{ margin: 0 }}
                      onChange={this.handleChange("amount", i)}
                    />
                  ) : (
                    <p onDoubleClick={this.handleDblClick("amount", i)}>
                      THB {Numeral(item.amount).format("0,0.00")}
                    </p>
                  )}
                </Grid.Column>

                {editable && (
                  <Grid.Column
                    width={2}
                    textAlign='right'
                    verticalAlign='middle'
                  >
                    <Delete id='delete-icon' onClick={this.remove(i)} />
                  </Grid.Column>
                )}
              </Grid.Row>
            );
          })}

          {editable && (
            <Grid.Row style={{ padding: 0 }}>
              <Button
                fullWidth
                color='secondary'
                variant='contained'
                style={{ marginTop: 16 }}
                onClick={this.add}
              >
                เพิ่ม
              </Button>
              <Button
                fullWidth
                color='primary'
                variant='contained'
                style={{
                  marginTop: 16,
                  display: index === null && "none"
                }}
                onClick={this.save}
              >
                บันทึก
              </Button>
            </Grid.Row>
          )}
        </Grid>
      </div>
    );
  }
}

export default withTheme()(MarketTable);
