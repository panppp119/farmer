import React, { Fragment } from "react";
import { Map, List } from "immutable";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container } from "semantic-ui-react";
import {
  TextField,
  Button,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";

import "./FarmForm.scss";

class FarmForm extends React.Component {
  static defaultProps = {
    user: Map(),
    farms: List()
  };

  state = {
    edit: false,
    farms: [{}]
  };

  edit = e => {
    this.setState({ edit: true });
  };

  cancel = e => {
    this.setState({ edit: false });
  };

  add = e => {
    const farms = this.state.farms;

    const farm = {
      description: "",
      type: "",
      area_rai: "",
      area_kgan: "",
      area_sqwa: "",
      years: 0
    };

    farms.push(farm);
    this.setState({ farms: farms });
  };

  handleChange = (index, name) => e => {
    const farms = this.state.farms;

    farms[index][name] = e.target.value;

    this.setState({ farms: farms });
  };

  render() {
    const { farms, edit } = this.state;
    const { loading } = this.props;

    var disabled = true;

    return (
      <div className='farm-form'>
        <Container>
          <form noValidate autoComplete='off'>
            <Grid>
              <Grid.Column computer={8} mobile={16}>
                {farms.length > 0 &&
                  farms.map((farm, i) => {
                    return (
                      <div className='farm-card' key={i}>
                        <TextField
                          fullWidth
                          label='ชนิดพืช/สัตว์/กิจกรรมการเกษตรอื่นๆ'
                          margin='normal'
                          value={farm.description || ""}
                          InputLabelProps={{
                            shrink: true
                          }}
                          style={{ marginTop: 0 }}
                          onChange={this.handleChange(i, "description")}
                          disabled={!edit}
                        />
                        <TextField
                          style={{ marginTop: 16, marginBottom: 8 }}
                          fullWidth
                          label='ระยะเวลาที่เริ่มจนถึงปัจจุบัน'
                          type='date'
                          value={farm.years || ""}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onChange={this.handleChange(i, "years")}
                          disabled={!edit}
                        />

                        <div className='farm-area'>
                          <p
                            className='label'
                            style={{ color: !edit && "rgba(0, 0, 0, 0.38)" }}
                          >
                            พื้นที่ปลูก/เลี้ยง
                          </p>

                          <TextField
                            margin='normal'
                            value={farm.area_rai || ""}
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  ไร่
                                </InputAdornment>
                              )
                            }}
                            className='area-input'
                            onChange={this.handleChange(i, "area_rai")}
                            disabled={!edit}
                          />
                          <TextField
                            margin='normal'
                            value={farm.area_kgan || ""}
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  งาน
                                </InputAdornment>
                              )
                            }}
                            className='area-input'
                            onChange={this.handleChange(i, "area_kgan")}
                            disabled={!edit}
                          />
                          <TextField
                            margin='normal'
                            value={farm.area_sqwa || ""}
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  ตร.วา
                                </InputAdornment>
                              )
                            }}
                            className='area-input'
                            onChange={this.handleChange(i, "area_sqwa")}
                            disabled={!edit}
                          />
                        </div>

                        <div className='sustainable-agriculture'>
                          <p
                            className='label'
                            style={{ color: !edit && "rgba(0, 0, 0, 0.38)" }}
                          >
                            เกษตรกรรมยั่งยืน
                          </p>

                          <RadioGroup
                            row
                            name='sustainable'
                            value={farm.sustainable}
                            onChange={this.handleChange(i, "sustainable")}
                          >
                            <FormControlLabel
                              value='0'
                              control={
                                <Radio color='primary' disabled={!edit} />
                              }
                              label={
                                <p className='label sustainable'>
                                  ไม่เป็นเกษตรกรรมยั่งยืน
                                </p>
                              }
                              labelPlacement='end'
                            />
                            <FormControlLabel
                              value='1'
                              control={
                                <Radio color='primary' disabled={!edit} />
                              }
                              label={
                                <p className='label sustainable'>
                                  เป็นเกษตรกรรมยั่งยืนในรูปแบบ
                                </p>
                              }
                              labelPlacement='end'
                            />
                          </RadioGroup>

                          {farm.sustainable === "1" && (
                            <div className='farm-type'>
                              <RadioGroup
                                name='type'
                                value={farm.type}
                                onChange={this.handleChange(i, "type")}
                              >
                                <FormControlLabel
                                  value='1'
                                  control={
                                    <Radio color='secondary' disabled={!edit} />
                                  }
                                  label={
                                    <p className='label sustainable'>
                                      เกษตรผสมผสาน
                                    </p>
                                  }
                                  labelPlacement='end'
                                />
                                <FormControlLabel
                                  value='2'
                                  control={
                                    <Radio color='secondary' disabled={!edit} />
                                  }
                                  label={
                                    <p className='label sustainable'>
                                      เกษตรอินทรีย์
                                    </p>
                                  }
                                  labelPlacement='end'
                                />
                                <FormControlLabel
                                  value='3'
                                  control={
                                    <Radio color='secondary' disabled={!edit} />
                                  }
                                  label={
                                    <p className='label sustainable'>
                                      เกษตรธรรมชาติ
                                    </p>
                                  }
                                  labelPlacement='end'
                                />
                                <FormControlLabel
                                  value='4'
                                  control={
                                    <Radio color='secondary' disabled={!edit} />
                                  }
                                  label={
                                    <p className='label sustainable'>
                                      เกษตรทฤษฎีใหม่
                                    </p>
                                  }
                                  labelPlacement='end'
                                />
                                <FormControlLabel
                                  value='5'
                                  control={
                                    <Radio color='secondary' disabled={!edit} />
                                  }
                                  label={
                                    <p className='label sustainable'>
                                      วนเกษตรหรือไร่นาป่าผสม
                                    </p>
                                  }
                                  labelPlacement='end'
                                />
                              </RadioGroup>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                <Button
                  fullWidth
                  variant='contained'
                  color='secondary'
                  onClick={this.add}
                  disabled={!edit}
                >
                  เพิ่ม
                </Button>
              </Grid.Column>

              <Grid.Column computer={8} mobile={16}>
                {edit ? (
                  <Fragment>
                    <Button
                      fullWidth
                      id='save-profile-button'
                      variant='contained'
                      color='primary'
                      disabled={disabled || loading}
                      onClick={this.save}
                    >
                      บันทึก
                    </Button>

                    <Button
                      fullWidth
                      id='edit-button'
                      variant='contained'
                      onClick={this.cancel}
                    >
                      ยกเลิก
                    </Button>
                  </Fragment>
                ) : (
                  <Button
                    fullWidth
                    id='edit-button'
                    variant='contained'
                    style={{ marginTop: 16 }}
                    onClick={this.edit}
                  >
                    แก้ไข
                  </Button>
                )}
              </Grid.Column>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

export default withTheme()(FarmForm);
