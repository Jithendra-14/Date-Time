import React, { Component } from "react";
import Calendar from "./calendar";
import Time from "./time";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { Tabs, Tab, Button } from "@material-ui/core";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";

export default class InputMoment extends Component {
  state = {
    tab: 0,
  };

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = (e) => {
    e.preventDefault();
    this.props.onSave();
  };

  render() {
    const { tab } = this.state;
    const {
      moment: m,
      className,
      prevMonthIcon,
      nextMonthIcon,
      minStep,
      hourStep,
      onSave,
      ...props
    } = this.props;

    return (
      <div className="m-input-moment" {...props}>
        <Tabs
          value={tab}
          onChange={this.handleClickTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<CalendarTodayIcon fontSize="small" />} />
          <Tab icon={<AccessAlarmIcon fontSize="small" />} />
        </Tabs>
        <div className="tabs">
          {tab === 0 && <Calendar moment={m} onChange={this.props.onChange} />}
          {tab === 1 && <Time moment={m} onChange={this.props.onChange} />}
        </div>

        <button
          type="button"
          className="im-btn btn-save ion-checkmark"
          onClick={this.handleSave}
        >
          Save
        </button>

        <Button
          variant="contained"
          startIcon={<DoneRoundedIcon />}
          onClick={this.handleSave}
        >
          Save
        </Button>
      </div>
    );
  }
}
